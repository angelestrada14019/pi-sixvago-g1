import React from 'react';
import json from '../body/producto.json';
import "./descripcion.css";
import ApiCall from "../../utils/ApiCall";
import { useEffect, useState } from 'react';
import { useStateContext } from "../../contexts/ContextProvider";

const Descripcion = ({ id }) => {
    const [producto, setProducto] = useState([])

    useEffect(() => {
      getProducto();     
    }, []);
  
  
    const getProducto= async ()=>{    
      const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
      console.log("headerProducto " + productoObtenido.nombre)
      setProducto(productoObtenido)
    }
  
    return (
        <div className="descripcion">
            <h2 className='titleDescription'>{producto.nombre}</h2>
            <p className='descriptionP'>{producto.descripcion}</p>
        </div>
    )
}

export default Descripcion;