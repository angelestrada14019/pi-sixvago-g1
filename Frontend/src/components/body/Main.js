import "./main.css";
import Cards from "../cards/Cards";
import Categories from "../cards/Categories";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import { LinearProgress } from "@mui/material";

const Main = () => {
  const { loading, setLoading, loadingFiltro, setLoadingFiltro } =
    useStateContext();

  useEffect(() => {
    setTimeout(() => {
      setLoadingFiltro(true);
      setLoading(false);
    }, 1500);
  }, []);

  const style = {
    backgroundColor: "#f5f5f5",
  };

  return (
    <div className="container">
      <Categories />
      {!loading ? <Cards /> : <LinearProgress color="inherit" />}
    </div>
  );
};

export default Main;
