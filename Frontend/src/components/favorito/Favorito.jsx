import React, { useState, useEffect } from "react";
import "./favorito.css";
import { useStateContext } from "../../contexts/ContextProvider";
const Favorito = ({ producto, enableFav }) => {
  const { favoritos, setFavoritos } = useStateContext();
  const [favoritoLo, setFavoritoLo] = useState({
    id: null,
    fv: false,
  });
  const handleClick = () => {
    setFavoritoLo({
      id: producto.productos_id,
      fv: favoritoLo.fv ? false : true,
    });
  };
  useEffect(() => {
    getFavoritos();
  }, [favoritos, producto]);
  useEffect(() => {
    addFavoritos();
  }, [favoritoLo]);

  const addFavoritos = () => {
    let favoritosL = favoritos;

    if (favoritoLo.fv) {
      let filterFav = favoritosL.some(
        (fav) => fav.productos_id === producto?.productos_id
      );
      if (!filterFav) {
        console.log("antes", favoritosL);
        favoritosL.push(producto);
        console.log("despues", favoritosL);
        let auxF = favoritosL;
        localStorage.setItem("favoritos", JSON.stringify(auxF));
        setFavoritos(auxF);
      } else {
      }
    } else {
      if (favoritosL.length > 0) {
        let fProductos = favoritosL.filter(
          (e) => e.productos_id !== producto?.productos_id
        );
        setFavoritos(fProductos);
        localStorage.setItem("favoritos", JSON.stringify(fProductos));
      }
    }
  };
  const getFavoritos = () => {
    console.log("entro Get");
    if (favoritos.length > 0) {
      favoritos.forEach((element) => {
        console.log("producto", producto);
        if (element.productos_id === producto?.productos_id) {
          console.log("entro Get if");
          setFavoritoLo({
            id: element.productos_id,
            fv: true,
          });
        }
      });
    }
  };
  return (
    <>
      <div onClick={handleClick} className="btn_favorito">
        {enableFav &&
          (favoritoLo.id === producto?.productos_id && favoritoLo.fv ? (
            <i className="fa-solid fa-heart fa-2x"></i>
          ) : (
            <i className="fa-regular fa-heart fa-2x btn_favorito-icon"></i>
          ))}
      </div>
    </>
  );
};

export default Favorito;
