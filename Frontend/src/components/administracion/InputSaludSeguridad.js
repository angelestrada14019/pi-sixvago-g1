import { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";

const InputSaludSeguridad = ({ setSeguridadProducto }) => {
  const [salud, setSalud] = useState([{ descripcion: "", tipoDePolitica: 0 }]);
  const [options, setOptions] = useState([{ id: 0, descripcion: "" }]);
  const [agregar, setAgregar] = useState("");

  useEffect(() => {
    if (options[0].descripcion === "") {
      getSeguridad();
    }
    setSeguridadProducto(salud);
  }, [salud]);

  const getSeguridad = async () => {
    const lista = await ApiCall.invokeGET("/politicas/2");
    let aux = [];
    lista.body.forEach((politica) => {
      if (
        options.find(
          (politica2) => politica2.descripcion === politica.descripcion
        ) === undefined
      ) {
        aux.push({ id: politica.id, descripcion: politica.descripcion });
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
      if (salud[0]?.descripcion === "") {
        setSalud([
          { id: e.target.id, descripcion: e.target.value, tipoDePolitica: 3 },
        ]);
      } else {
        setSalud([
          ...salud,
          { id: e.target.id, descripcion: e.target.value, tipoDePolitica: 3 },
        ]);
      }
    } else {
      setSalud(
        salud.filter((politica) => politica.descripcion !== e.target.value)
      );
    }
  };

  return (
    <div className="inner-container">
      {options.map((politica) => (
        <div key={politica.id}>
          <input
            type="checkbox"
            name="politicas"
            onChange={handleCheckBoxChange}
            value={politica.descripcion}
            id={politica.id}
          />
          <label htmlFor="politicas">{politica.descripcion}</label>
        </div>
      ))}
      <label htmlFor="salud">Agregar:</label>
      <div className="input-container">
        <input
          name="salud"
          placeholder="Escriba aqui"
          id="text-salud"
          className="text-politicas"
          value={agregar}
          onChange={(e) => setAgregar(e.target.value)}
        />
        <i
          onClick={handleClick}
          className="fa fa-regular fa-square-plus fa-3x"
        ></i>
      </div>
    </div>
  );
};

export default InputSaludSeguridad;
