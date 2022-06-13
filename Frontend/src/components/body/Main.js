import "./main.css";
import Cards from "./Cards.js";
import Categories from "./Categories";
import { useStateContext } from "../../contexts/ContextProvider";
import Loader from "../../utils/Loader";
import { useEffect } from "react";
import {LinearProgress } from '@mui/material';
const Main = () => {
  const { loading, setLoading,loadingFiltro,setLoadingFiltro } = useStateContext();

  useEffect(() => {
    setTimeout(() => {
        setLoadingFiltro(true);
      setLoading(false);
    }, 1500);
  }, []);

  const style ={
      backgroundColor: '#f5f5f5',
  }
 

  return (
    <div className="container">
      <Categories />
      {(!loading) ? (
          <Cards />
          ) : (
              <div className="container_cirularProgress">
            <LinearProgress color="inherit"/>
        </div>
      )}
    </div>
  );
};

export default Main;
