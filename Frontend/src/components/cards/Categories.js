import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (loading) {
      getCategoryNames();
    }
  }, [loading]);

  const handleClick = (name, e) => {
    setCardCategory(name);
    setPageNumber(0);
    setLocation("");
    setloadingFnChange(true);
    setLoading(true);
  };

  const getCategoryNames = async () => {
    const lista = await ApiCall.invokeGET("/categorias");
    setListaCategorias(lista);
  };

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
