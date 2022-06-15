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
      <Categories />
      <section className="cards-section">
        <h2 className="section-h2">Recomendaciones</h2>
        <Cards />
      </section>
    </div>
  );
};

export default Main;
