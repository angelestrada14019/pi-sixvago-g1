import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApiCall from "../utils/ApiCall";
import AuthContext from "./AuthContext";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [cardCategory, setCardCategory] = useState("");
  const [list, setList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [location, setLocation] = useState("");
  const [reservaIn, setReservaIn] = useState("");
  const [reservaOut, setReservaOut] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loadingFnChange, setloadingFnChange] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const { validateToken } = useContext(AuthContext);
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
      if (
        searchParams.get("nombreCiudad") &&
        searchParams.get("fechaInicial")
      ) {
        filtrarProductosPorCiudadYReserva(
          searchParams.get("nombreCiudad"),
          searchParams.get("fechaInicial"),
          searchParams.get("fechaFinal")
        );
      } else if (
        !searchParams.get("nombreCiudad") &&
        searchParams.get("fechaInicial")
      ) {
        filtrarProductosPorReserva(
          searchParams.get("fechaInicial"),
          searchParams.get("fechaFinal")
        );
      } else if (searchParams.keys().next().value === "nombreCiudad") {
        setLocation(searchParams.values().next().value);
        filtrarNombreCiudad(searchParams.values().next().value);
      } else if (searchParams.keys().next().value === "tituloCategoria") {
        filtrarTituloCategoria(searchParams.get("tituloCategoria"));
      }
    } else if (!validateToken() && cardCategory === "") {
      getProductos();
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
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getProductos = async () => {
    try {
      if (loading) {
        const lista = await ApiCall.invokeGET("/productos");
        let shuffleList = shuffle(lista.body);
        setList(shuffleList);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setloadingFnChange(false);
      setLoadingFiltro(false);
    }
  }

  const filtrarTituloCategoria = async (tituloCategoria) => {
    try {
      const filtroQuery = await ApiCall.invokeGET(
        `/productos/categorias?tituloCategoria=${tituloCategoria}`
      );
      setList(filtroQuery.body);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setloadingFnChange(false);
      setLoadingFiltro(false);
    }
  };

  const filtrarNombreCiudad = async (nombreCiudad) => {
    try {
      const filtroQuery = await ApiCall.invokeGET(
        `/productos/ciudad?nombreCiudad=${nombreCiudad}`
      );
      setList(filtroQuery.body);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setloadingFnChange(false);
      setLoadingFiltro(false);
    }
  };

  const filtrarProductosPorReserva = async (fechaInicial, fechaFinal) => {
    try {
      const filtroQuery = await ApiCall.invokeGET(
        `/productos/reserva?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`
      );
      setList(filtroQuery.body);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setloadingFnChange(false);
      setLoadingFiltro(false);
    }
  };

  const filtrarProductosPorCiudadYReserva = async (
    nombreCiudad,
    fechaInicial,
    fechaFinal
  ) => {
    const porCiudad = await ApiCall.invokeGET(
      `/productos/ciudad?nombreCiudad=${nombreCiudad}`
    );
    const porReserva = await ApiCall.invokeGET(
      `/productos/fecha?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`
    );
    const resultado = porCiudad.body.filter((producto) =>
      porReserva.body.find((productoReserva) => producto.id === productoReserva.id)
    );
    setList(resultado);
    setLoading(false);
    setloadingFnChange(false);
    setLoadingFiltro(false);
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
          reservaIn,
          setReservaIn,
          reservaOut,
          setReservaOut,
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
