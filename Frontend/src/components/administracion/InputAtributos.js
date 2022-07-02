import React, { useState } from 'react'

const InputAtributos = ({handleAtributo,handleIcono,nuevoAtributo,nuevoIcono, i}) => {
    const [disableRender, setDisableRender] = useState(false)
    const [atributos, setAtributos] = useState([])
    const [iconos, setIconos] = useState([])
    /*const handleAtributo = (event) => {
        setNuevoAtributo({ ...nuevoAtributo, [event.target.name]: event.target.value });
        //console.log(event.target.value); //borrar
    }
    const handleIcono = (e) => {
        setNuevoIcono({ ...nuevoIcono, [e.target.name]: e.target.value })
    }
}*/
const handleClick = (event) => {
    setDisableRender(true)
    setIconos([...iconos, nuevoIcono]);
    setAtributos([...setAtributos, nuevoAtributo]);}
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
                    disabled={disableRender}
                    
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
                    disabled={disableRender}
                />
            </div>
            <div className="botonAgregarAtributo">
                <button onClick={handleClick}><i className="fa fa-regular fa-square-plus fa-3x "></i></button>
            </div>
            {
                        atributos.length > 0? atributos.map((input, i) => <InputAtributos handleAtributo={handleAtributo} handleIcono={handleIcono} handleClick={handleClick} nuevoAtributo={nuevoAtributo} nuevoIcono={nuevoIcono} i={i}/>):null
                    }
            </>
    )
}
export default InputAtributos
