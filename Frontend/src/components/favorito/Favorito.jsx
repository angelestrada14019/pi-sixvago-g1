import React,{useState,useEffect} from 'react'
import './favorito.css';
const Favorito = ({producto}) => {
    
    const [favoritoLo,setFavoritoLo]=useState({
        id:null,
        fv:false
    })
    const handleClick =()=>{        
        setFavoritoLo({
            id:producto.productos_id,
            fv:favoritoLo.fv?false:true
        })
    }
    useEffect(()=>{
          getFavoritos();
    },[])
    useEffect(() => {
        console.log("render");
        
        addFavoritos();
        
    }, [favoritoLo]);

    

    const addFavoritos=()=>{
        let favoritosL=localStorage.getItem("favoritos")?JSON.parse(localStorage.getItem("favoritos")):[];     
      
        if(favoritoLo.fv){
            favoritosL.push(producto);
            localStorage.setItem("favoritos",JSON.stringify(favoritosL))
        }else{
            if(favoritosL.length>0){
               let fProductos= favoritosL.filter((e)=>e.productos_id!==producto.productos_id)
               localStorage.setItem("favoritos",JSON.stringify(fProductos))
            }
            
        }
    }
    const getFavoritos=()=>{
        let favoritosL=localStorage.getItem("favoritos")?JSON.parse(localStorage.getItem("favoritos")):[]; 
        if (favoritosL.length>0) {
            favoritosL.forEach(element => {
                if (element.productos_id===producto.productos_id) {
                    console.log("element if",element);
                    setFavoritoLo({
                        id:favoritosL.productos_id,
                        fv:true
                    })
                }
            });
        }
    }
  return (
    <>
    <div onClick={handleClick} className='btn_favorito'>
        {console.log("productoL",producto)}
        {(favoritoLo.id===producto?.productos_id) && favoritoLo.fv?
        <i className="fa-solid fa-heart fa-2x"></i>
        :    
        <i  className="fa-regular fa-heart fa-2x btn_favorito-icon"></i>
    }
    </div>
        
    </>
  )
}

export default Favorito