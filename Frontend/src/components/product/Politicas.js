import React from 'react';
import "./politicas.css";
import ApiCall from "../../utils/ApiCall";
import { useEffect, useState } from 'react';

const Politicas = ({id}) => {
    const [producto, setProducto] = useState([])

    useEffect(() => {
      getProducto();     
    }, []);
  
  
    const getProducto= async ()=>{    
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    console.log("headerProducto" + productoObtenido.caracteristicas.map(item => item.nombre))
    setProducto(productoObtenido)
  }

    return (
        <div className="politicas">
            <h2 className='politicas-title'>Que tenes que saber</h2>
            <hr></hr>
            <div className="politicas-container">
                <div className='normasCasa politicasSection'>
                    <h3 className='subsection-title'>Normas de la casa</h3>
                    <ul >
                        <li className='lista'>check-in: 10 PM</li>
                        <li className='lista'>check-out: 12 AM</li>
                        <li className='lista'>No se permiten fiestas</li>
                        <li className='lista'>No matar a tus vecinos</li>
                    </ul>
                </div>
                    <div className='saludYSeguridad politicasSection'>
                        <h3 className='subsection-title'>Salud y seguridad</h3>
                        <ul >
                        <li className='lista'>Alergias</li>
                        <li className='lista'>Enfermedades</li>
                        <li className='lista'>Mal de ojo</li>
                        <li className='lista'>Empacho</li>
                    </ul>
                    </div>
                    <div className='cancelacion politicasSection'>
                        <h3 className='subsection-title'>Politicas de Cancelacion</h3>
                        <ul >
                            <li className='lista'>Cancelaciones antes de las 12 PM</li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default Politicas;