import React from 'react'

const InputAtributos = ({handleAtributo,handleIcono,handleClick,nuevoAtributo,nuevoIcono, i}) => {
/*     const [atributos, setAtributos] = useState([])
    const [nuevoAtributo, setNuevoAtributo] = useState({});
    const [nuevoIcono, setNuevoIcono] = useState({});
    const [inputs, setInputs] = useState([])

    const handleAtributo = (event) => {
        setNuevoAtributo({ ...nuevoAtributo, [event.target.name]: event.target.value });
        //console.log(event.target.value); //borrar
    }
    const handleIcono = (e) => {
        setNuevoIcono({ ...nuevoIcono, [e.target.name]: e.target.value })
    }
    const handleClick = (event) => {
        setIconos([...iconos, nuevoIcono]);
        setAtributos([...atributos, nuevoAtributo]);
    } */
    return (<>
            <div className="datos-atributos">
                <label>Nombre</label>
                <input
                    type="text"
                    name={`atributo${i}`}
                    placeholder="  Ejemplo: Wifi"
                    id="atributo-nombre"
                    className="propiedad"
                    onChange={handleAtributo}
                    value={nuevoAtributo[`atributo${i}`]}
                />
            </div>
            <div className="datos-atributos">
                <label>Icono</label>
                <input
                    type="text"
                    name={`iconos${i}`}
                    placeholder="  Ejemplo: fa-wifi"
                    id="atributo-icono"
                    className="propiedad"
                    onChange={handleIcono}
                    value={nuevoIcono[`iconos${i}`]}
                />
            </div>
            <div className="botonAgregarAtributo">
                <button onClick={handleClick}><i className="fa fa-regular fa-square-plus fa-3x "></i></button>
            </div>
            </>
    )
}
export default InputAtributos
