import React,{useEffect,useState} from 'react';
import { useSearchParams } from "react-router-dom";
import ApiCall from '../utils/ApiCall';

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
    <div>
        {verify?
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <p>Se verifico correctamente</p>
        </>:
        <>
        
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <p>No se logro verificar</p>
        </>
    }
    </div>
  )
}

export default Verify