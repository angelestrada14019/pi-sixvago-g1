import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApiCall from "../utils/ApiCall";

const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const [cardCategory, setCardCategory] = useState("");
  const [list, setList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [location, setLocation] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loadingFnChange, setloadingFnChange] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  // searchParams.values().next().value devuelve el valor de la query despues del =
  // searchParams.keys().next().value devuelve el nombre de la query antes del =

  useEffect(() => {
    if (loading) {
      getListaProducto();
      getListaCiudades();
    }
  }, [loading, loadingFiltro]);

  const getListaProducto = async () => {
    if (searchParams.values().next().value) {
      if (searchParams.keys().next().value !== "tituloCategoria") {
        setLocation(searchParams.values().next().value);
        try {
          const filtroQuery = await ApiCall.invokeGET(
            `/productos/ciudad?${searchParams.toString()}`
          );
          setList(filtroQuery.body);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          setloadingFnChange(false);
          setLoadingFiltro(false);
          // console.log("finally");
        }
      } else if (searchParams.keys().next().value === "tituloCategoria") {
        const filtroQuery = await ApiCall.invokeGET(
          `/productos/categorias?${searchParams.toString()}`
        );
        if (filtroQuery.body?.length > 0) {
          setLoading(false);
          setloadingFnChange(false);
          setLoadingFiltro(false);
          setList(filtroQuery.body);
        }
      }
    } else if (
      !localStorage.getItem("isLoggedIn") &&
      cardCategory === ""
    ) {
      try {
        const lista = await ApiCall.invokeGET("/productos");
        let shuffleList = shuffle(lista.body);
        setList(shuffleList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setloadingFnChange(false);
        setLoadingFiltro(false);
      }
    } else {
      const lista = await ApiCall.invokeGET("/productos");
      setLoading(false);
      setloadingFnChange(false);
      setLoadingFiltro(false);
      setList(lista.body);

      //setProduct(lista);
    }
  };
  const getListaCiudades = async () => {
    const lista = await ApiCall.invokeGET("/ciudades");
    if (lista.body?.length > 0) {
      setLocationsList(lista.body);
    }
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
