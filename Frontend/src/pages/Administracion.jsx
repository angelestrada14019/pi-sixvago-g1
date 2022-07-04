import "./administracion.css"
import CreateProduct from "../components/administracion/CreateProduct"
import HeadingAdm from "../components/administracion/HeadingAdm";


const Adminisracion = () => {
    return(
        <div className="page-adm">
        <HeadingAdm/>            
        <div className="titulo-producto">
            <h2>Crear propiedad</h2>
        </div>
        <div className="administracion-container">
            <CreateProduct/>
        </div>
        </div>
    )
}
export default Adminisracion;