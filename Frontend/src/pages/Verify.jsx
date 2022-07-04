import React,{useEffect,useState} from 'react';
import { useSearchParams } from "react-router-dom";
import ApiCall from '../utils/ApiCall';
import { Link } from "react-router-dom";
import "./verify.css"

const Verify = () => {
    const [verify, setVerify] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const verificate=async()=>{
            if (searchParams.values().next().value) {
                if (
                  searchParams.get("code") 
                ) {
                    const response = await ApiCall.invokeGET(
                        `/usuarios/verify?code=${searchParams.get("code")}`
                      ); 
                      if(response.ok){
                        setVerify(true);
                      }               
                }
                
        }
    }
        verificate();
    }, [verify]);
  return (
    <div className='verificacion-container'>
        {verify?
        <div className='verificacion'>
          <div className="card-reservaExitosa">
            <div className="icon-successful">
                <i className="fa-solid fa-building-circle-check fa-bounce"></i>
            </div>
            <h1 className="titulo-exitoso">¡Excelente!</h1>
            <p className="subtitulo-exitoso">
                Su cuenta se ha verificado con exito.
            </p>
            <Link to={"/"}>
                <button className="boton-succes"> Volver al menu</button>
            </Link>
        </div>
        </div>:
        <>
        <div className='verifiacion'>
        <div className="card-reservaExitosa">
            <div className="icon-successful">
                <i className="fa-solid fa-circle-exclamation fa-bounce"></i>
            </div>
            <h1 className="titulo-exitoso">Que pena 😥</h1>
            <p className="subtitulo-exitoso">
                Su cuenta no se ha verificado correctamente.
            </p>
            <Link to={"/"}>
                <button className="boton-succes"> Volver al menu</button>
            </Link>
            </div>
            </div>
        </>
    }
    </div>
  )
}

export default Verify