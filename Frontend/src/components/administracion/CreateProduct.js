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
    const [disable, setDisable] = useState([false]);
    const [disableClone, setDisableClone] = useState([false]);

    useEffect(() => {
        setDisableClone(disable)
    }, [disable]);


    const handleAtributo = (event) => {
        setNuevoAtributo({ ...nuevoAtributo, [event.target.name]: event.target.value });
        //console.log(event.target); //borrar
    }
    const handleIcono = (e) => {
        setNuevoIcono({ ...nuevoIcono, [e.target.name]: e.target.value })
    }
    const handleClickDelete = (event) => {
        let auxIconos = iconos;
        let id = auxIconos.filter(icono => {
            //let auxiliar = []
            for (const key in icono) {
                if ( icono[key] !== event.target.id ){
                    return icono
                    //auxiliar.push(icono)
                }
            }
            //return auxiliar
        } )
        console.log(id);
        let aux = disable
        console.log("id",event.target);
        aux.splice(event.target.id,1)
        setDisable(aux)/*
        console.log(disable);
        let auxIconos = iconos;
        auxIconos.splice(event.target.id,1);
        console.log("auxIconos",auxIconos);
        setIconos(auxIconos);
        console.log(iconos);
        let auxAtributos = atributos;
        auxAtributos.splice(event.target.id,1);
        setAtributos(auxAtributos);
        console.log(atributos); */

    }
    const handleClick = (event) => {
        let aux = disable
        aux.push(false)
        for (let i = 0; i < aux.length -1; i++){
            aux[i]= true;
        }
        setDisable(aux)
        setIconos([...iconos, nuevoIcono]);
        setAtributos([...atributos, nuevoAtributo])
        setNuevoAtributo({})
        setNuevoIcono({})
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
                    {
                        disableClone.length > 0? disableClone.map((input, i) =>  <InputAtributos key={`atributos${i}`} handleAtributo={handleAtributo} handleIcono={handleIcono} handleClick={handleClick} nuevoAtributo={nuevoAtributo} nuevoIcono={nuevoIcono} i={i} disable={input} handleClickDelete={handleClickDelete}/>) :null
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