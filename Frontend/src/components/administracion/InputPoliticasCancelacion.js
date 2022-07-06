import { useEffect, useState } from "react";
import Select from "react-select";
import ApiCall from "../../utils/ApiCall";

const InputPoliticasCancelacion = ({ setCancelacionProducto }) => {
  const [cancelacion, setCancelacion] = useState([
    { descripcion: "", tipoDePolitica: {
        id:0
      } },
  ]);
  const [options, setOptions] = useState([{ id: 0, descripcion: "" }]);
  const [agregar, setAgregar] = useState("");

  useEffect(() => {
    if (options[0].descripcion === "") {
      getSeguridad();
    }
    setCancelacionProducto(cancelacion);
  }, [cancelacion]);

  const getSeguridad = async () => {
    const lista = await ApiCall.invokeGET("/politicas/3");
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
      if (cancelacion[0]?.descripcion === "") {
        setCancelacion([
          { id: e.target.id, descripcion: e.target.value, tipoDePolitica: {
            id:3
          } },
        ]);
      } else {
        setCancelacion([
          ...cancelacion,
          { id: e.target.id, descripcion: e.target.value, tipoDePolitica: {
            id:3
          } },
        ]);
      }
    } else {
      setCancelacion(
        cancelacion.filter(
          (politica) => politica.descripcion !== e.target.value
        )
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
      <label htmlFor="cancelacion">Agregar:</label>
      <div className="input-container">
        <input
          name="cancelacion"
          placeholder="Escriba aqui"
          id="text-cancelacion"
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

export default InputPoliticasCancelacion;
