import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Cards from "../cards/Cards";
import Categories from "../cards/Categories";
import "./main.css";

const Main = () => {
  const { setLoading, setLoadingFiltro } = useStateContext();

  useEffect(() => {
    setLoadingFiltro(true);
    setLoading(true);
  }, []);

  return (
    <div className="container">
      <section className="categories-section">
        <div>
          <h2 className="section-h2">Buscar por tipo de alojamiento</h2>
          <Categories />
        </div>
      </section>
      <section className="cards-section">
        <div>
          <h2 className="section-h2">Recomendaciones</h2>
          <Cards />
        </div>
      </section>
    </div>
  );
};

export default Main;
