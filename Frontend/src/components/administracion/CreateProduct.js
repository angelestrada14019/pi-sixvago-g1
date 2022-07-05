import React, { useEffect } from "react";
import "./createProduct.css";
import { useState } from "react";
import InputAtributos from "./InputAtributos";
import ApiCall from "../../utils/ApiCall";
import Select from "react-select";
import InputNormas from "./InputNormas";
import InputSaludSeguridad from "./InputSaludSeguridad";
import InputPoliticasCancelacion from "./InputPoliticasCancelacion";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    direccion: "",
    politicas: "",
    categorias_id: {
      id: 0,
    },
    ciudades_id: {
      ciudades_id: 0,
    },
    caracteristicas: [
      {
        caracteristicas_id: 0,
      },
    ],
  });
  const [caracteristicas, setCaracterisitcas] = useState([
    {
      nombre: "",
      icono: "",
    },
  ]);
  const [caracteristicasConId, setCaracterisitcasConId] = useState([
    {
      id: 0,
      nombre: "",
      icono: "",
    },
  ]);
  const [checkBoxCaract, setCheckBoxCaract] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [normasProducto, setNormasProducto] = useState([]);
  const [seguridadProducto, setSeguridadProducto] = useState([]);
  const [cancelacionProducto, setCancelacionProducto] = useState([]);

  useEffect(() => {
    getCategoryNames();
    getCiudades();
    getCaracteristicas();
  }, []);

  const getCategoryNames = async () => {
    const lista = await ApiCall.invokeGET("/categorias");
    setCategorias(lista.body);
  };

  const getCiudades = async () => {
    const lista = await ApiCall.invokeGET("/ciudades");
    setCiudades(lista.body);
  };

  const getCaracteristicas = async () => {
    const lista = await ApiCall.invokeGET("/caracteristicas");
    setCheckBoxCaract(lista.body);
  };

  //----------------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //------------------------------------------------------------------------------------------------
  const handleInputChange = (e) => {};
  const handleClickAdd = (e) => {
    setCaracterisitcas([
      ...caracteristicas,
      {
        nombre: "",
        icono: "",
      },
    ]);
  };

  const handleClickRemove = (i) => {
    const list = [...caracteristicas];
    list.splice(i, 1);
    setCaracterisitcas(list);
  };

  const handleClickChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...caracteristicas];
    list[index][name] = value;
    setCaracterisitcas(list);
  };

  const handleCheckBoxChange = (e, i) => {
    if (e.target.checked) {
      if (caracteristicasConId[0]?.nombre === "") {
        setCaracterisitcasConId([
          { nombre: e.target.value, icono: e.target.name, id: e.target.id },
        ]);
      } else {
        setCaracterisitcasConId([
          ...caracteristicasConId,
          { nombre: e.target.value, icono: e.target.name, id: e.target.id },
        ]);
      }
    } else {
      setCaracterisitcasConId(
        caracteristicasConId.filter(
          (caracteristica) => caracteristicasConId.nombre !== e.target.value
        )
      );
    }
  };
  //------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------
  return (
    <div className="creacion-producto">
      <div className="datos-container">
        <div className="datos-propiedad">
          <label>Nombre de la propiedad</label>
          <input
            type="text"
            name="product-name"
            placeholder="Ingrese nombre de la propiedad"
            id="propiedad-nombre"
            className="propiedad"
            onChange={handleInputChange}
          />
        </div>
        <div className="datos-propiedad">
          <label>Categoría</label>

          <select
            name="categoria"
            placeholder="Ingrese categoria de la propiedad"
            id="propiedad-categoria"
            className="propiedad"
          >
            {categorias.map((categoria) => (
              <option
                key={`${categoria.titulo}${categoria.id}`}
                value={categoria.titulo}
              >
                {categoria.titulo}
              </option>
            ))}
          </select>
        </div>
        <div className="datos-propiedad">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion de propiedad"
            placeholder="Ingrese direccion de la propiedad"
            id="propiedad-direccion"
            className="propiedad"
          />
        </div>
        <div className="datos-propiedad">
          <label>Ciudad</label>
          <select
            name="ciudad de propiedad"
            placeholder="Ingrese ciudad de la propiedad"
            id="propiedad-ciudad"
            className="propiedad"
          >
            {ciudades.map((ciudad) => (
              <option
                key={`${ciudad.nombre}${ciudad.ciudades_id}`}
                value={ciudad.nombre}
              >
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="textArea">
        <label>Descripción</label>
        <textarea
          cols="40"
          rows="6"
          placeholder="  Escriba aqui"
          id="text"
        ></textarea>
      </div>
      <div className="titulo-dato">
        <h2>Agregar atributos</h2>
      </div>
      <div className="atributos-container">
        <div className="atributos-container-column">
          <div className="checkBoxCaracteristicas">
            {checkBoxCaract.map((caracteristica, index) => (
              <>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    value={caracteristica.nombre}
                    id={caracteristica.caracteristicas_id}
                    name={caracteristica.icono}
                    key={`${caracteristica.nombre}${index}`}
                  />
                  <i className={`${caracteristica.icono}`}></i>
                  <label>{caracteristica.nombre}</label>
                </div>
              </>
            ))}
          </div>
          <div className="input-atributos">
            {caracteristicas.map((caracteristica, i) => (
              <InputAtributos
                caracteristica={caracteristica}
                handleClickChange={handleClickChange}
                key={i}
                i={i}
                caracteristicas={caracteristicas}
                handleClickRemove={handleClickRemove}
                handleClickAdd={handleClickAdd}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="titulo-politicas">
        <h2>Politicas Producto</h2>
      </div>
      <div className="politicas-producto">
        <div className="politicas-contenedor">
          <div className="normas">
            <h3>Normas de la casa</h3>
            <InputNormas setNormasProducto={setNormasProducto} />
          </div>
          <div className="salud-seguridad">
            <h3>Salud y seguridad</h3>
            <InputSaludSeguridad setSeguridadProducto={setSeguridadProducto} />
          </div>
          <div className="cancelacion">
            <h3>Politicas de cancelación</h3>
            <InputPoliticasCancelacion
              setCancelacionProducto={setCancelacionProducto}
            />
          </div>
        </div>
      </div>
      <div className="titulo-cargaimagenes">
        <h2>Cargar imagenes</h2>
      </div>
      <div className="cargaImagenes-container">
        <div className="input-cargaimagenes">
          <div className="datos-imagenes">
            <input
              type="text"
              name="carga de imagen"
              placeholder="Insertar https://"
              id="cargaImagen"
              className="propiedad"
            />
          </div>
          <div>
            <button>
              <i className="fa fa-regular fa-square-plus fa-3x "></i>
            </button>
          </div>
        </div>
      </div>
      <div className="boton-crearProducto">
        <button id="boton-crear" type="submit" onClick={handleSubmit}>
          Crear Producto
        </button>
      </div>
    </div>
  );
};
export default CreateProduct;
