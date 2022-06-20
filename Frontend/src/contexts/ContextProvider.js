import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ApiCall from "../utils/ApiCall";

const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [mustLogin, setMustLogin] = useState(false);
  const [cardCategory, setCardCategory] = useState("");
  const [list, setList] = useState([]);
  const [product, setProduct] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [location, setLocation] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loadingFnChange, setloadingFnChange] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(true);
  const { pathname: currentLocation } = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  // searchParams.values().next().value devuelve el valor de la query despues del =
  // searchParams.keys().next().value devuelve el nombre de la query antes del =

  useEffect(() => {
    if (currentLocation === "/login") {
      setOpenLogin(true);
    }
  }, [openLogin]);

  useEffect(() => {
    if (loading) {
      getListaProducto();
      setloadingFnChange(false);
      setLoadingFiltro(false);
      getListaCiudades();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading, loadingFiltro]);

  const getListaProducto = async () => {
    if (searchParams.values().next().value) {
      if (searchParams.keys().next().value !== "tituloCategoria") {
        setLocation(searchParams.values().next().value);
        const filtroQuery = await ApiCall.invokeGET(
          `/productos/ciudad?${searchParams.toString()}`
        );
        setList(filtroQuery);
      } else if (searchParams.keys().next().value === "tituloCategoria") {
        const filtroQuery = await ApiCall.invokeGET(
          `/productos/categorias?${searchParams.toString()}`
        );
        setList(filtroQuery);
      }
    } else {
      const lista = await ApiCall.invokeGET("/productos");
      if (
        localStorage.getItem("isLoggedIn") === "false" &&
        cardCategory === ""
      ) {
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
    }
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
          openLogin,
          setOpenLogin,
          mustLogin,
          setMustLogin,
        }}
      >
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useStateContext = () => useContext(StateContext);
