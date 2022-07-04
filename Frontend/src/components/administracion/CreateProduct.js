import React, { useEffect } from "react";
import "./createProduct.css";
import { useState } from "react";

const CreateProduct = () => {
  const [atributos, setAtributos] = useState([]);
  const [nuevoAtributo, setNuevoAtributo] = useState({});
  const [iconos, setIconos] = useState([]);
  const [nuevoIcono, setNuevoIcono] = useState({});
  const [position, setPosition] = useState(0);
  const [disable, setDisable] = useState([false]);
  const [disableClone, setDisableClone] = useState([false]);
  //-------------------------------------------------------------------------------------
  const [caracteristicas, setCaracterisitcas] = useState([
    {
      atributo: "",
      icono: "",
    },
  ]);

  //----------------------------------------------------------------------------------------

  useEffect(() => {
    setDisableClone(disable);
  }, [disable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(atributos);
  };
  //------------------------------------------------------------------------------------------------
  const handleClickAdd = (e) => {
    setCaracterisitcas([
      ...caracteristicas,
      {
        atributo: "",
        icono: "",
      },
    ]);
  };
  const handleClickRemove = (i)=>{
    const list =[...caracteristicas];
    list.splice(i,1);
    setCaracterisitcas(list)
  }
  const handleClickChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...caracteristicas];
    list[index][name] = value;
    setCaracterisitcas(list);
  };

  return (
    <div className="creacion-producto">
      <div className="datos-container">
        <div className="datos-propiedad">
          <label>Nombre de la propiedad</label>
          <input
            type="text"
            name="nombre de propiedad"
            placeholder="Ingrese nombre de la propiedad"
            id="propiedad-nombre"
            className="propiedad"
          />
        </div>
        <div className="datos-propiedad">
          <label>Categoría</label>
          <select
            name="categoria"
            placeholder="Ingrese categoria de la propiedad"
            id="propiedad-categoria"
            className="propiedad"
          />
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
        ></textarea>
      </div>
      <div className="titulo-dato">
        <h2>Agregar atributos</h2>
      </div>
      <div className="atributos-container">
        <div className="input-atributos">
          {caracteristicas.map((caracteristica, i) => (
            <>
              <div className="datos-atributos">
                <label>Nombre</label>
                <input
                  type="text"
                  name="atributo"
                  placeholder="Ejemplo: Wifi"
                  id="atributo-nombre"
                  className="propiedad"
                  onChange={(e) => handleClickChange(e, i)}
                  value={caracteristica.atributo}
                   disabled={i!==(caracteristicas.length-1)?true:false}
                />
              </div>
              <div className="datos-atributos">
                <label>Icono</label>
                <input
                  type="text"
                  name="icono"
                  placeholder="Ejemplo: fa-wifi"
                  id="atributo-icono"
                  className="propiedad"
                  onChange={(e) => handleClickChange(e, i)}
                  value={caracteristica.icono}
                  disabled={i!==(caracteristicas.length-1)?true:false}
                />
              </div>
              <div>
              {(caracteristicas.length !==1 && i!==(caracteristicas.length-1)) &&(
                <div className="botonAgregarAtributo">
                  <i 
                  onClick={()=>handleClickRemove(i)}
                  class="fa-regular fa-rectangle-xmark fa-3x"></i>
                </div>)
                }
                {(caracteristicas.length-1) ===i &&(
                <div className="botonAgregarAtributo">
                  <i
                    onClick={handleClickAdd}
                    className="fa fa-regular fa-square-plus fa-3x "
                  ></i>
                </div>)
                }
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="titulo-politicas">
        <h2>Politicas Producto</h2>
      </div>
      <div className="politicas-producto">
        <div className="politicas-contenedor">
          <div>
            <h3>Normas de la casas</h3>
            <label>Descripción</label>
            <textarea
              cols="30"
              rows="6"
              placeholder="Escriba aqui"
              id="text-normas"
              className="text-politicas"
            />
          </div>
          <div>
            <h3>Salud y seguridad</h3>
            <label>Descripción</label>
            <textarea
              cols="30"
              rows="6"
              placeholder="Escriba aqui"
              id="text-saludYSeguridad"
              className="text-politicas"
            />
          </div>
          <div>
            <h3>Politicas de cancelación</h3>
            <label>Descripción</label>
            <textarea
              cols="30"
              rows="6"
              placeholder="Escriba aqui"
              id="text-cancelacion"
              className="text-politicas"
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
