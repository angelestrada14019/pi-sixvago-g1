import { useEffect, useState } from 'react';
import ApiCall from "../../utils/ApiCall";
import "./descripcion.css";

const Descripcion = ({ id }) => {
    const [producto, setProducto] = useState([])

    useEffect(() => {
      getProducto();     
    }, []);
  
  
    const getProducto= async ()=>{    
      const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
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