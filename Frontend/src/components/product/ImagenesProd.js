import React from 'react';
import json from '../body/producto.json';
import "./ImagenesProd.css";

const ImagenesProd = () => {
    //const array = Object.keys(json.img);
    return (
        //Map all the imgs from the json file
        json.map((obj, index) => {
            return (
                <div key={index} className="img-container">
                    {obj.img.map((img, index) => {
                        return (
                            <img key={index} src={img.url} alt={img.alt} className={`${"selector"+index} img-fluid`}/>
                        )
                    })}
                </div>
            )}
    ));
}

export default ImagenesProd;