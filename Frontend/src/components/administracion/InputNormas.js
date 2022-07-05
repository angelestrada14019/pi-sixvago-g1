import { useEffect, useState } from "react";

import ApiCall from "../../utils/ApiCall";

const InputNormas = ({ setNormasProducto }) => {
  const [normas, setNormas] = useState([
    { descripcion: "", tipoDePolitica: 0 },
  ]);
  const [options, setOptions] = useState([{ id: 0, descripcion: "" }]);
  const [agregar, setAgregar] = useState("");

  useEffect(() => {
    if (options[0].descripcion === "") {
      getNormas();
    }
    setNormasProducto(normas);
  }, [normas]);

  const getNormas = async () => {
    const lista = await ApiCall.invokeGET("/politicas/1");
    let aux = [];
    lista.body.forEach((norma) => {
      if (
        options.find((norma2) => norma2.descripcion === norma.descripcion) ===
        undefined
      ) {
        aux.push({ id: norma.id, descripcion: norma.descripcion });
      }
    });
    setOptions(aux);
  };

  const handleClick = (e) => {
    if (agregar !== "") {
      setOptions([...options, { id: e.target.id, descripcion: agregar }]);
    }
  };

  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      if (normas[0]?.descripcion === "") {
        setNormas([{ descripcion: e.target.value, tipoDePolitica: 1 }]);
      } else {
        setNormas([
          ...normas,
          { descripcion: e.target.value, tipoDePolitica: 1 },
        ]);
      }
    } else {
      setNormas(normas.filter((norma) => norma.descripcion !== e.target.value));
    }
  };

  return (
    <div className="inner-container">
      {options.map((norma) => (
        <div key={norma.id}>
          <input
            type="checkbox"
            name="normas"
            onChange={handleCheckBoxChange}
            value={norma.descripcion}
            id={norma.id}
          />
          <label htmlFor="normas">{norma.descripcion}</label>
        </div>
      ))}
      <label htmlFor="normas">Agregar:</label>
      <div className="input-container">
        <input
          name="normas"
          placeholder="Escriba aqui"
          id="text-normas"
          className="text-politicas"
          value={agregar}
          onChange={(e) => setAgregar(e.target.value)}
        />
        <i
          onClick={handleClick}
          className="fa fa-regular fa-square-plus fa-3x "
        ></i>
      </div>
    </div>
  );
};

export default InputNormas;
