import React from 'react';
import json from '../body/producto.json';
import "./descripcion.css";

const Descripcion = () => {
    return (
        <div className="descripcion">
            <h2 className='titleDescription'>{json[0].title}</h2>
            <p className='descriptionP'>{json[0].description}</p>
        </div>
    )
}

export default Descripcion;