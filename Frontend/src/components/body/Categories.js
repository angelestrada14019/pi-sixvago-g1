import React, { useEffect, useState } from "react";

import "./categories.css";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";

const Categories = () => {
  const {
    setCardCategory,
    setLocation,
    setPageNumber,
    setloadingFnChange,
    setLoading,
    loading,
    loadingFiltro,
    setLoadingFiltro
  } = useStateContext();
  const [listaCategorias, setListaCategorias] = useState([]);
  
  useEffect(() => {
    getCategoryNames();
  }, [loading]);

  const handleClick = (name, e) => {
      setLoadingFiltro(false);
    setCardCategory("");
    setPageNumber(0);
    setLocation("");
    setloadingFnChange(false);
    setLoading(true);
    setTimeout(() => {
      setCardCategory(name);
      setloadingFnChange(true);
      setLoading(false);
    }, 1000);
  };

  const getCategoryNames = async () => {
    const lista = await ApiCall.invokeGET("/categorias");
    setListaCategorias(lista);
  }
  
  return (
    <section className="categories-section">
      <h2 className="section-h2">Buscar por tipo de alojamiento</h2>
      <div className="cardCategory">
        {listaCategorias.map((item, i) => {
          return (
            <div
              onClick={(e) => handleClick(item.titulo, e)}
              className="renderCategory"
              key={item.id}
            >
              <img
                className="cardCategory-img"
                src={`${item.urlImagen}`}
                alt={item.titulo}
              />
              <h2>{item.titulo}</h2>
              <p>807.105 hoteles</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Categories;
