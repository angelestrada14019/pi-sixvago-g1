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
  const [dateReserva, setDateReserva] = useState({
    date: [],
    longDateIn: "",
    longDateOut: "",
    queryInicial: "",
    queryFinal: "",
    shortDateIn: "",
    shortDateOut: "",
  });
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
      getProductosAndShuffle();
    } else {
      getProductos();
    }
  };

  const getListaCiudades = async () => {
    const lista = await ApiCall.invokeGET("/ciudades");
    if (lista.body?.length > 0) {
      setLocationsList(lista.body);
    }
  };

  const getProductosAndShuffle = async () => {
    const response = await ApiCall.invokeGET("/productos");
    const lista = response.body;
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    setList(lista);
    setLoading(false);
    setloadingFnChange(false);
    setLoadingFiltro(false);
  };

  const getProductos = async () => {
    const lista = await ApiCall.invokeGET("/productos");
    setList(lista.body);
    setLoading(false);
    setloadingFnChange(false);
    setLoadingFiltro(false);
  };

  const filtrarTituloCategoria = async (tituloCategoria) => {
    const filtroQuery = await ApiCall.invokeGET(
      `/productos/categorias?tituloCategoria=${tituloCategoria}`
    );
    setList(filtroQuery.body);
    setLoading(false);
    setloadingFnChange(false);
    setLoadingFiltro(false);
  };

  const filtrarNombreCiudad = async (nombreCiudad) => {
    const filtroQuery = await ApiCall.invokeGET(
        `/productos/ciudad?nombreCiudad=${nombreCiudad}`
    );
    setList(filtroQuery.body);
    setLoading(false);
    setloadingFnChange(false);
    setLoadingFiltro(false);
  };

  const filtrarProductosPorReserva = async (fechaInicial, fechaFinal) => {
    const filtroQuery = await ApiCall.invokeGET(
        `/productos/fecha?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`
    );
    setList(filtroQuery.body);
    setLoading(false);
    setloadingFnChange(false);
    setLoadingFiltro(false);
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
    const resultado = porReserva.body.filter(
      (producto) =>
        producto.ciudades_id.nombre === porCiudad.body[0].ciudades_id.nombre
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
          dateReserva,
          setDateReserva,
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
