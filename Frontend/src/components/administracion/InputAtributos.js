import React, { useState } from 'react'

const InputAtributos = ({handleAtributo,handleIcono,handleClick,nuevoAtributo,nuevoIcono, i, disable, handleClickDelete}) => {
    /*const handleAtributo = (event) => {
    const [disableRender, setDisableRender] = useState(false)
    const [atributos, setAtributos] = useState([])
    const [iconos, setIconos] = useState([])
        setNuevoAtributo({ ...nuevoAtributo, [event.target.name]: event.target.value });
        //console.log(event.target.value); //borrar
    }
    const handleIcono = (e) => {
        setNuevoIcono({ ...nuevoIcono, [e.target.name]: e.target.value })
    }
    const handleClick = (event) => {
        setDisableRender(true)
        setIconos([...iconos, nuevoIcono]);
        setAtributos([...setAtributos, nuevoAtributo]);}
}*/

    return (<>
            <div className="datos-atributos">
                <label>Nombre</label>
                <input
                    type="text"
                    name={`atributo${i}`}
                    placeholder="Ejemplo: Wifi"
                    id="atributo-nombre"
                    className="propiedad"
                    onChange={handleAtributo}
                    value={nuevoAtributo[`atributo${i}`]}
                    disabled={disable}
                    
                />
            </div>
            <div className="datos-atributos">
                <label>Icono</label>
                <input
                    type="text"
                    name={`iconos${i}`}
                    placeholder="Ejemplo: fa-wifi"
                    id="atributo-icono"
                    className="propiedad"
                    onChange={handleIcono}
                    value={nuevoIcono[`iconos${i}`]}
                    disabled={disable}
                />
            </div>
            { disable?<div  className="botonAgregarAtributo">
                <i id={nuevoIcono[`iconos${i}`]} onClick={handleClickDelete}  class="fa-regular fa-rectangle-xmark fa-3x"></i>
            </div> : <div className="botonAgregarAtributo">
                <i id={`add${i}`} onClick={handleClick} className="fa fa-regular fa-square-plus fa-3x "></i>
            </div>}
            </>
    )
}
export default InputAtributos
