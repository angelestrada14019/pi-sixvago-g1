import React, { useState } from 'react'

const InputAtributos = ({caracteristica,handleClickChange, i, caracteristicas,handleClickRemove,handleClickAdd}) => {
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
            name="atributo"
            placeholder="Ejemplo: Wifi"
            id="atributo-nombre"
            className="propiedad"
            onChange={(e) => handleClickChange(e, i)}
            value={caracteristica.atributo}
             disabled={i!==(caracteristicas.length-1)?true:false}
          />
        </div>
        <div className="datos-atributos">
          <label>Icono</label>
          <input
            type="text"
            name="icono"
            placeholder="Ejemplo: fa-wifi"
            id="atributo-icono"
            className="propiedad"
            onChange={(e) => handleClickChange(e, i)}
            value={caracteristica.icono}
            disabled={i!==(caracteristicas.length-1)?true:false}
          />
        </div>
        <div>
        {(caracteristicas.length !==1 && i!==(caracteristicas.length-1)) &&(
          <div className="botonAgregarAtributo">
            <i 
            onClick={()=>handleClickRemove(i)}
            class="fa-regular fa-rectangle-xmark fa-3x"></i>
          </div>)
          }
          {(caracteristicas.length-1) ===i &&(
          <div className="botonAgregarAtributo">
            <i
              onClick={handleClickAdd}
              className="fa fa-regular fa-square-plus fa-3x "
            ></i>
          </div>)
          }
        </div>
      </>
    )
}
export default InputAtributos
