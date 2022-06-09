import "./main.css";
import Cards from "./Cards.js";
import Categories from "./Categories";
import { useStateContext } from "../../contexts/ContextProvider";
import Loader from "../../utils/Loader";
import { useEffect } from "react";

const Main = () => {
  const { loading, setLoading } = useStateContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container">
      <Categories />
      {!loading ? (
        <Cards />
      ) : (
        <div>
          <h2>Cargando... </h2>
        </div>
      )}
    </div>
  );
};

export default Main;
