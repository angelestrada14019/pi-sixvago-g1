import React from 'react';
import json from '../body/producto.json';
import "./caracteristicas.css";


const Caracteristicas = () => {
    //return (
      //  <div className="caracteristicas">
        //    <h3>{json[0].caracteristica[0].nombre}</h3>
          //  <i className={`${json[0].caracteristica[0].icono}`}></i>
        //</div>
        //                )
        return(
            <div className="caracteristicas">
                <h2 className='caracteristicas-title'>¿Que ofrece este lugar?</h2>
                <hr></hr>
                <div className="caracteristicas-container">
            {json[0].caracteristica.map((obj, index) => {
                return(
                    <div key={index} className="caracteristica">
                        <i className={`${obj.icono} icono`}></i>
                        <span className='nombre'>{obj.nombre}</span>
                    </div>
                )
            })}</div></div>)
        
}
export default Caracteristicas;