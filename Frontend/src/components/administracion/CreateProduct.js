import { useEffect } from "react";
import { useState } from "react";
import InputAtributos from "./InputAtributos";
import ApiCall from "../../utils/ApiCall";
import InputNormas from "./InputNormas";
import InputSaludSeguridad from "./InputSaludSeguridad";
import InputPoliticasCancelacion from "./InputPoliticasCancelacion";
import InputImagenes from "./InputImagenes";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import "./createProduct.css";
import Select from "react-select";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    direccion: "",
    habitaciones: 0,
    latitud: 0,
    longitud: 0,
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
  const [nuevaCiudad, setNuevaCiudad] = useState({
    nombre: "",
    pais: "",
  });
  const [nuevaCiudadValue, setNuevaCiudadValue] = useState("");
  const [checkBoxCaract, setCheckBoxCaract] = useState([]);
  const [imagenesProducto, setImagenesProducto] = useState([]);
  const [normasProducto, setNormasProducto] = useState([]);
  const [seguridadProducto, setSeguridadProducto] = useState([]);
  const [cancelacionProducto, setCancelacionProducto] = useState([]);
  //----------------------------------------------------------------------------------------
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 6,
      background: state.isFocused
        ? `linear-gradient(-40deg,
      rgba(203, 178, 106, 0.7) 10%,
      rgba(255, 245, 218, 0.7) 50%,
      rgba(190, 158, 68, 0.7) 110%
    )`
        : state.isSelected
        ? `linear-gradient(40deg,
      rgba(203, 178, 106, 1) 10%,
      rgba(255, 245, 218, 1) 50%,
      rgba(190, 158, 68, 1) 110%
    )`
        : "none",
      color: "#black",
      fontFamily: "Roboto",
    }),
    control: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      width: "100%",
      height: "40px",
      border: "none",
      boxShadow: "0px 0px 10px #26262631",
      borderRadius: "5px",
      margin: "10px 0px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  //----------------------------------------------------------------------------------------
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
    let ciudadAux1 =
      product.ciudades_id.ciudades_id === 0 && nuevaCiudad.nombre === "";
    let ciudadAux2 =
      product.ciudades_id.ciudades_id !== 0 || nuevaCiudad.nombre !== "";
    if (
      ciudadAux1 ||
      !ciudadAux2 ||
      product.nombre === "" ||
      product.descripcion === "" ||
      product.direccion === "" ||
      product.categorias_id.id === 0 ||
      product.habitaciones === "" ||
      product.latitud === "" ||
      product.longitud === "" ||
      caracteristicasConId[0].nombre === "" ||
      caracteristicasConId[0].icono === "" ||
      Object.keys(imagenesProducto[0]).length === 0 ||
      normasProducto[0].descripcion === "" ||
      seguridadProducto[0].descripcion === "" ||
      cancelacionProducto[0].descripcion === ""
    ) {
      setEmptyFields(true);
    } else {
      postNewProduct();
    }
  };

  const postNewProduct = async () => {
    let auxCiudadId = 0;
    let auxCaract = [];
    let auxPoliticas = [];
    let auxImg = [];
    let auxProducto = product;

    try {
      if (product.ciudades_id.ciudades_id === 0) {
        const ciudad = await ApiCall.invokePOST("/ciudades", nuevaCiudad);
        // console.log(ciudad.body.ciudades_id);
        auxCiudadId = ciudad.body.ciudades_id;
        auxProducto.ciudades_id.ciudades_id = auxCiudadId;
      }
      if (caracteristicasNuevas[0].nombre !== "") {
        for (let i = 0; i < caracteristicasNuevas.length; i++) {
          const caract = caracteristicasNuevas[i];
          if (caract.nombre !== "") {
            // console.log("POST /caracteristicas");
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
          // console.log("normas", norma);
          if (norma.id !== "") {
            let newN = { id: norma.id };
            auxPoliticas.push(newN);
            // console.log("normas", norma);
          } else {
            // console.log("POST de normas");
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
            // console.log("POST de securty");
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
            // console.log("POST de cancel");
            const response = await ApiCall.invokePOST("/politicas", norma);
            let id = response.body.id;
            let newN = { id: id };
            auxPoliticas.push(newN);
          }
        }
      }
      auxProducto.caracteristicas = auxCaract;
      auxProducto.politicas = auxPoliticas;
      // console.log("POST PRODUCTO", auxProducto);
      const postProducto = await ApiCall.invokePOST("/productos", auxProducto);
      // console.log(postProducto.body);
      const id = postProducto.body.productos_id;

      imagenesProducto.forEach((img) => {
        if (img.urlImagen !== "") {
          img.productos_id = id;
          auxImg.push(img);
        }
      });
      for (let i = 0; i < auxImg.length; i++) {
        const img = auxImg[i];
        // console.log("POST IMAGENES");
        const postImg = await ApiCall.invokePOST("/imagenes", img);
        // console.log(postImg);
      }
    } catch (error) {
      console.log(error);
      setAlert(true);
    } finally {
      navigate("productoExitoso");
    }
  };
  //------------------------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "product-name") {
      setProduct({ ...product, nombre: value });
    }
    // if (name === "categoria") {
    //   let options = e.target.options;
    //   let id = options[options.selectedIndex].id;
    //   setProduct({ ...product, categorias_id: { id: id } });
    // }
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

  // este es cuando uno escribe en el input
  const handleCiudadInputChange = (inputValue) => {
    // console.log("InputChange");
    // console.log(inputValue);
    setNuevaCiudadValue(inputValue);
  };
  // este es cuando uno selecciona una ciudad o le da enter a la que quiere crear
  const handleCiudadChange = (newValue, actionMeta) => {
    // console.log("ValueChange");
    // console.log(newValue);
    // console.log(actionMeta.action);
    if (actionMeta.action === "clear") {
      setProduct({ ...product, ciudades_id: { ciudades_id: 0 } });
    }
    if (actionMeta.action === "select-option") {
      if (newValue.id) {
        // console.log("Selecciono una ciudad");
        setNuevaCiudad({ nombre: "", pais: "" });
        setProduct({ ...product, ciudades_id: { ciudades_id: newValue.id } });
      }
    }
    if (actionMeta.action === "create-option") {
      // console.log("Creo una ciudad");
      setProduct({ ...product, ciudades_id: { ciudades_id: 0 } });
      let arr = nuevaCiudadValue.split(",");
      let nombre = arr[0].trim();
      let pais = arr[1].trim();
      setNuevaCiudad({ nombre: nombre, pais: pais });
    }
  };
  const handleInputCategoria = (inputValue) => {
    let options = inputValue;
    let id = options.id;
    setProduct({ ...product, categorias_id: { id: id } });
  };
  //------------------------------------------------------------------------------------------------
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setAlert(false);
      setEmptyFields(false);
      return;
    }
    setAlert(false);
    setEmptyFields(false);
  };
  //------------------------------------------------------------------------------------------------
  return (
    <div className="creacion-producto">
      {!emptyFields ? null : (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
          open={emptyFields}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="info"
            variant="outlined"
            sx={{
              marginBottom: "10px",
              background: "#262626",
              fontWeight: "bold",
              color: "#0c8dc7",
              padding: "10px 20px",
            }}
          >
            Todos los campos son obligatorios.
          </Alert>
        </Snackbar>
      )}
      {!alert ? null : (
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            variant="outlined"
            sx={{
              marginTop: "150px",
              background: "#262626",
              fontWeight: "bold",
              color: "#c93330",
              padding: "10px 20px",
            }}
          >
            Lamentablemente el producto no ha podido crearse. Por favor intente
            más tarde.
          </Alert>
        </Snackbar>
      )}
      <div className="datos-container">
        <div className="datos-propiedad">
          <label>Nombre de la propiedad</label>
          <input
            required
            type="text"
            name="product-name"
            placeholder="Nombre..."
            id="propiedad-nombre"
            className="propiedad"
            onChange={handleInputChange}
          />
        </div>
        <div className="datos-propiedad">
          <label>Habitaciones</label>
          <input
            required
            type="text"
            name="habitaciones"
            placeholder="Ej: 2"
            id="propiedad-habitaciones"
            className="propiedad habitaciones"
            onChange={handleInputChange}
          />
        </div>
        <div className="datos-propiedad">
          <label>Categoría</label>
          <Select
            name="categoria"
            styles={customStyles}
            placeholder="Seleccione una..."
            onChange={handleInputCategoria}
            options={categorias.map((categoria) => ({
              value: categoria.titulo,
              label: categoria.titulo,
              id: categoria.id,
            }))}
          />
        </div>
        <div className="datos-propiedad">
          <label className="label-ciudad">Ciudad</label>
          <CreatableSelect
            styles={customStyles}
            isClearable
            placeholder="Ciudad, Pais"
            onChange={handleCiudadChange}
            onInputChange={handleCiudadInputChange}
            options={ciudades.map((ciudad) => ({
              value: `${ciudad.nombre}, ${ciudad.pais}`,
              label: `${ciudad.nombre}, ${ciudad.pais}`,
              id: ciudad.ciudades_id,
            }))}
          />
        </div>
        <div className="datos-propiedad">
          <label>Dirección</label>
          <input
            required
            type="text"
            name="direccion"
            placeholder="Direccion..."
            id="propiedad-direccion"
            className="propiedad"
            onChange={handleInputChange}
          />
        </div>
        <div className="datos-propiedad latitud-longitud">
          <div className="datos-propiedad">
            <label>Latitud</label>
            <input
              required
              type="text"
              name="latitud"
              placeholder="Ej: -34.6"
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
              placeholder="Ej: 58.5"
              id="propiedad-longitud"
              className="propiedad"
              onChange={handleInputChange}
            />
          </div>
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
                <div key={index} className="checkbox">
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
