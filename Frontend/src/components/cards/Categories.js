import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";
import "./categories.css";

const Categories = () => {
  const {
    setCardCategory,
    setLocation,
    setPageNumber,
    setLoading,
    loading,
    setloadingFnChange,
  } = useStateContext();
  const [listaCategorias, setListaCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryNames();
  }, []);

  const handleClick = (name, e) => {
    navigate({
      pathname: "/buscar",
      search: `?${createSearchParams({
        tituloCategoria: name,
      })}`,
    });
    setCardCategory(name);
    setPageNumber(0);
    setLocation("");
    setloadingFnChange(true);
    setLoading(true);
  };

  const getCategoryNames = async () => {
    const lista = await ApiCall.invokeGET("/categorias");
    setListaCategorias(lista.body);
  };

  return (
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
  );
};
export default Categories;
