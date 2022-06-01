import React from 'react';
import json from '../body/listado.json';

const ImagenesProd = () => {
    return (
        <div className="cards">
            {json.map((item, i) => (
            <img src={`${json.img.url[i]}`} alt="probando"></img>
            ))}
        </div>
    );
}

export default ImagenesProd;