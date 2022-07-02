import React, { useEffect } from "react";
import "./createProduct.css"
import { useState } from "react";
import InputAtributos from "./InputAtributos";

const CreateProduct = () => {
    const [atributos, setAtributos] = useState([])
    const [nuevoAtributo, setNuevoAtributo] = useState({});
    const [iconos, setIconos] = useState([])
    const [nuevoIcono, setNuevoIcono] = useState({});
    const [inputs, setInputs] = useState([])
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        setInputs([...inputs, "x"])
    }, [atributos]);
    const handleAtributo = (event) => {
        setNuevoAtributo({ ...nuevoAtributo, [event.target.name]: event.target.value });
        //console.log(event.target); //borrar
    }
    const handleIcono = (e) => {
        setNuevoIcono({ ...nuevoIcono, [e.target.name]: e.target.value })
    }
    const handleClick = (event) => {
        setDisable(true)
        setIconos([...iconos, nuevoIcono]);
        setAtributos([...atributos, nuevoAtributo]);
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(atributos);
    }
    /*console.log(nuevoAtributo);
    console.log(nuevoIcono);
    console.log(atributos);
    console.log(iconos);*/
    //console.log(atributos);
    //console.log(iconos);
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
                        className="propiedad" />
                </div>
                <div className="datos-propiedad">
                    <label>Categoría</label>
                    <select
                        name="categoria"
                        placeholder="Ingrese categoria de la propiedad"
                        id="propiedad-categoria"
                        className="propiedad" />
                </div>
                <div className="datos-propiedad">
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="direccion de propiedad"
                        placeholder="Ingrese direccion de la propiedad"
                        id="propiedad-direccion"
                        className="propiedad" />
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
                <textarea cols="40" rows="6" placeholder="  Escriba aqui" id="text"></textarea>
            </div>
            <div className="titulo-dato">
                <h2>Agregar atributos</h2>
            </div>
            <div className="atributos-container">
                <div className="input-atributos">
                    <div className="datos-atributos">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombreAtributo"
                            placeholder="Ejemplo: Wifi"
                            id="atributo-nombre"
                            className="propiedad"
                            onChange={handleAtributo}
                            value={nuevoAtributo.nombreAtributo}
                            disabled={disable}
                        />
                    </div>
                    <div className="datos-atributos">
                        <label>Icono</label>
                        <input
                            type="text"
                            name="iconoAtributo"
                            placeholder="Ejemplo: fa-wifi"
                            id="atributo-icono"
                            className="propiedad"
                            onChange={handleIcono}
                            value={nuevoIcono.iconoAtributo}
                            disabled={disable}
                        />
                    </div>
                    <div className="botonAgregarAtributo">
                        <button onClick={handleClick}><i className="fa fa-regular fa-square-plus fa-3x "></i></button>
                    </div>
                    {
                        atributos.length > 0? atributos.map((input, i) => <InputAtributos handleAtributo={handleAtributo} handleIcono={handleIcono} handleClick={handleClick} nuevoAtributo={nuevoAtributo} nuevoIcono={nuevoIcono} i={i}/>):null
                    }
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
                        <textarea cols="30" rows="6" placeholder="Escriba aqui" id="text-normas" className="text-politicas" />
                    </div>
                    <div>
                        <h3>Salud y seguridad</h3>
                        <label>Descripción</label>
                        <textarea cols="30" rows="6" placeholder="Escriba aqui" id="text-saludYSeguridad" className="text-politicas" />
                    </div>
                    <div>
                        <h3>Politicas de cancelación</h3>
                        <label>Descripción</label>
                        <textarea cols="30" rows="6" placeholder="Escriba aqui" id="text-cancelacion" className="text-politicas" />
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
                        <button ><i className="fa fa-regular fa-square-plus fa-3x "></i></button>
                    </div>
                </div>
            </div>
            <div className="boton-crearProducto">
                <button id="boton-crear" type="submit" onClick={handleSubmit}>
                    Crear Producto
                </button>
            </div>
        </div>
    )

}
export default CreateProduct;