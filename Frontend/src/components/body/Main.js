import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Cards from "../cards/Cards";
import Categories from "../cards/Categories";
import PaginationControll from "../pagination/PaginationControll";
import "./main.css";

const Main = () => {
  const { list, setLoading, setLoadingFiltro, setPageNumber, loadingFnChange } =
    useStateContext();
  const productsPerPage = 4;

  useEffect(() => {
    setLoadingFiltro(true);
    setLoading(true);
  }, []);

  const pageCount = Math.ceil(list.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      <section className="categories-section">
          <h2 className="section-h2">Buscar por tipo de alojamiento</h2>
          <Categories />
      </section>
      <section className="cards-section">
          <h2 className="section-h2">Recomendaciones</h2>
          <Cards />
      </section>
      <div>
        {!loadingFnChange && (
          <PaginationControll pageCount={pageCount} changePage={changePage} />
        )}
      </div>
    </div>
  );
};

export default Main;
