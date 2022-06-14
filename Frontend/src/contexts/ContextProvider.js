import { createContext, useContext, useState, useEffect } from "react";
import ApiCall from "../utils/ApiCall";

const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const [cardCategory, setCardCategory] = useState("");
  const [list, setList] = useState([]);
  const [product, setProduct] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [location, setLocation] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loadingFnChange, setloadingFnChange] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(true);

  useEffect(() => {
    if (loading) {
      getListaProducto();
      setLoading(false);
      setloadingFnChange(false);
      setLoadingFiltro(false);
    }
    getListaCiudades();
  }, [loading, loadingFiltro]);

  const getListaProducto = async () => {
    const lista = await ApiCall.invokeGET("/productos");

    if (localStorage.getItem("isLoggedIn") === "false" && cardCategory === "") {
      let shuffleList = shuffle(lista);
      if (loadingFiltro) {
        setList(shuffleList);
      }
    } else {
      if (loadingFiltro) {
        setList(lista);
      }
    }
    //setProduct(lista);
  };
  const getListaCiudades = async () => {
    const lista = await ApiCall.invokeGET("/ciudades");
    setLocationsList(lista);
  };

  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <>
      <StateContext.Provider
        value={{
          cardCategory,
          setCardCategory,
          product,
          setProduct,
          list,
          setList,
          locationsList,
          setLocationsList,
          location,
          setLocation,
          pageNumber,
          setPageNumber,
          loadingFnChange,
          setloadingFnChange,
          loading,
          setLoading,
          loadingFiltro,
          setLoadingFiltro,
        }}
      >
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useStateContext = () => useContext(StateContext);
