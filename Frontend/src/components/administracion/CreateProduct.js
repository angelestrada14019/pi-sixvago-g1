import React, { useEffect } from "react";
import "./createProduct.css";
import { useState } from "react";
import InputAtributos from "./InputAtributos";
import ApiCall from "../../utils/ApiCall";
import Select from "react-select";
import InputNormas from "./InputNormas";
import InputSaludSeguridad from "./InputSaludSeguridad";
import InputPoliticasCancelacion from "./InputPoliticasCancelacion";
import InputImagenes from "./InputImagenes";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    direccion: "",
    categorias_id: {
      id: 0,
    },
    ciudades_id: {
      ciudades_id: 0,
    },
    politicas: [
      {
        id: 0,
      },
    ],
    caracteristicas: [{}],
  });
  const [caracteristicasNuevas, setCaracterisitcasNuevas] = useState([
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
  const [categorias, setCategorias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [checkBoxCaract, setCheckBoxCaract] = useState([]);
  const [imagenesProducto, setImagenesProducto] = useState([]);
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
    // validar los campos
    // if (validar los campos) {
    postNewProduct();
    // }
  };

  const postNewProduct = async () => {
    let auxCaract = [];
    let auxPoliticas = [];
    let auxImg = [];
    let auxProducto = product;

    try {
      if (caracteristicasNuevas[0].nombre !== "") {
        for (let i = 0; i < caracteristicasNuevas.length; i++) {
          const caract = caracteristicasNuevas[i];
          if (caract.nombre !== "") {
            console.log("POST /caracteristicas");
            const response = await ApiCall.invokePOST(
              "/caracteristicas",
              caract
            );
            let id = response.body.caracteristicas_id;
            let newC = { caracteristicas_id: id };
            auxCaract.push(newC);
          }
        }
      }
      if (caracteristicasConId[0].nombre !== "") {
        for (let i = 0; i < caracteristicasConId.length; i++) {
          const caract = caracteristicasConId[i];
          let newC = { caracteristicas_id: caract.id };
          auxCaract.push(newC);
        }
      }
      if (normasProducto[0].descripcion !== "") {
        for (let i = 0; i < normasProducto.length; i++) {
          const norma = normasProducto[i];
          console.log("normas", norma);
          if (norma.id !== "") {
            let newN = { id: norma.id };
            auxPoliticas.push(newN);
            console.log("normas", norma);
          } else {
            console.log("POST de normas");
            const response = await ApiCall.invokePOST("/politicas", norma);
            let id = response.body.id;
            let newN = { id: id };
            auxPoliticas.push(newN);
          }
        }
      }
      if (seguridadProducto[0].descripcion !== "") {
        for (let i = 0; i < seguridadProducto.length; i++) {
          const norma = seguridadProducto[i];
          if (norma.id !== "") {
            let newN = { id: norma.id };
            auxPoliticas.push(newN);
          } else {
            console.log("POST de securty");
            const response = await ApiCall.invokePOST("/politicas", norma);
            let id = response.body.id;
            let newN = { id: id };
            auxPoliticas.push(newN);
          }
        }
      }
      if (cancelacionProducto[0].descripcion !== "") {
        for (let i = 0; i < cancelacionProducto.length; i++) {
          const norma = cancelacionProducto[i];
          if (norma.id !== "") {
            let newN = { id: norma.id };
            auxPoliticas.push(newN);
          } else {
            console.log("POST de cancel");
            const response = await ApiCall.invokePOST("/politicas", norma);
            let id = response.body.id;
            let newN = { id: id };
            auxPoliticas.push(newN);
          }
        }
      }
      auxProducto.caracteristicas = auxCaract;
      auxProducto.politicas = auxPoliticas;
    } catch (error) {
      console.log(error);
    } finally {
      // validar que no haya campos vacios
      console.log("POST PRODUCTO", auxProducto);
      const postProducto = await ApiCall.invokePOST("/productos", auxProducto);
      console.log(postProducto.body);
      const id = postProducto.body.productos_id;

      imagenesProducto.forEach((img) => {
        if (img.urlImagen !== "") {
          img.productos_id = id;
          auxImg.push(img);
        }
      });
      for (let i = 0; i < auxImg.length; i++) {
        const img = auxImg[i];
        console.log("POST IMAGENES");
        const postImg = await ApiCall.invokePOST("/imagenes", img);
        console.log(postImg);
      }
    }
  };
  //------------------------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "product-name") {
      setProduct({ ...product, nombre: value });
    }
    if (name === "categoria") {
      let options = e.target.options;
      let id = options[options.selectedIndex].id;
      setProduct({ ...product, categorias_id: { id: id } });
    }
    if (name === "direccion") {
      setProduct({ ...product, direccion: value });
    }
    if (name === "ciudad") {
      let options = e.target.options;
      let id = options[options.selectedIndex].id;
      setProduct({ ...product, ciudades_id: { ciudades_id: id } });
    }
    if (name === "descripcion") {
      setProduct({ ...product, descripcion: value });
    }
    if (name === "habitaciones") {
      setProduct({ ...product, habitaciones: value });
    }
    if (name === "latitud") {
      setProduct({ ...product, latitud: value });
    }
    if (name === "longitud") {
      setProduct({ ...product, longitud: value });
    }
  };

  const handleClickAdd = (e) => {
    setCaracterisitcasNuevas([
      ...caracteristicasNuevas,
      {
        nombre: "",
        icono: "",
      },
    ]);
  };

  const handleClickRemove = (i) => {
    const list = [...caracteristicasNuevas];
    list.splice(i, 1);
    setCaracterisitcasNuevas(list);
  };

  const handleClickChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...caracteristicasNuevas];
    list[index][name] = value;
    setCaracterisitcasNuevas(list);
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
  return (
    <div className="creacion-producto">
      <div className="datos-container">
        <div className="datos-propiedad">
          <label>Nombre de la propiedad</label>
          <input
            required
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
            className="propiedad"
            onChange={handleInputChange}
          >
            {categorias.map((categoria) => (
              <option
                key={`${categoria.titulo}${categoria.id}`}
                id={categoria.id}
                value={categoria.titulo}
              >
                {categoria.titulo}
              </option>
            ))}
          </select>
        </div>
        <div className="datos-propiedad">
          <label>Ciudad</label>
          <select
            name="ciudad"
            placeholder="Ingrese ciudad de la propiedad"
            id="propiedad-ciudad"
            className="propiedad"
            onChange={handleInputChange}
          >
            {ciudades.map((ciudad) => (
              <option
                key={`${ciudad.nombre}${ciudad.ciudades_id}`}
                id={ciudad.ciudades_id}
                value={ciudad.nombre}
              >
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="datos-propiedad">
          <label>Habitaciones</label>
          <input
            required
            type="text"
            name="habitaciones"
            placeholder="Ingrese habitaciones de la propiedad"
            id="propiedad-habitaciones"
            className="propiedad"
            onChange={handleInputChange}
          />
        </div>
        <div className="datos-propiedad">
          <label>Dirección</label>
          <input
            required
            type="text"
            name="direccion"
            placeholder="Ingrese direccion de la propiedad"
            id="propiedad-direccion"
            className="propiedad"
            onChange={handleInputChange}
          />
        </div>
        <div className="datos-propiedad">
          <label>Latitud</label>
          <input
            required
            type="text"
            name="latitud"
            placeholder="Ingrese latitud de la propiedad"
            id="propiedad-latitud"
            className="propiedad"
            onChange={handleInputChange}
          />
        </div>
        <div className="datos-propiedad">
          <label>Longitud</label>
          <input
            required
            type="text"
            name="longitud"
            placeholder="Ingrese longitud de la propiedad"
            id="propiedad-longitud"
            className="propiedad"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="textArea">
        <label>Descripción</label>
        <textarea
          cols="40"
          rows="6"
          placeholder="  Escriba aqui"
          id="text"
          name="descripcion"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="titulo-dato">
        <h2>Caracteristicas</h2>
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
            {caracteristicasNuevas.map((caracteristica, i) => (
              <InputAtributos
                caracteristica={caracteristica}
                handleClickChange={handleClickChange}
                key={i}
                i={i}
                caracteristicas={caracteristicasNuevas}
                handleClickRemove={handleClickRemove}
                handleClickAdd={handleClickAdd}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="titulo-politicas">
        <h2>Politicas</h2>
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
        <InputImagenes setImagenesProducto={setImagenesProducto} />
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
