import React, { createContext, useContext, useState,useEffect } from "react";
import listado from "../components/body/listado.json";
import ApiCall from "../utils/ApiCall";

const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const listLocation = [
    {
      id: 1,
      name: "Buenos Aires",
    },
    {
      id: 2,
      name: "Bogotá",
    },
    {
      id: 3,
      name: "Miami",
    },
    {
      id: 4,
      name: "Colombia",
    },
    {
      id: 5,
      name: "Montréal, QC, Canada",
    },
    {
      id: 6,
      name: "Australia",
    },
    {
      id: 7,
      name: "Switzerland",
    },
  ];
  const [cardCategory, setCardCategory] = useState("");
  const [list, setList] = useState([]);
  const [product, setProduct] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [location, setLocation] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loadingFnChange, setloadingFnChange] = useState(true);
  useEffect(() => {
    getListaProducto();
    getListaCiudades();
      setProduct(listado);
    setLocationsList(listLocation);
    if (localStorage.getItem("isLoggedIn") === "false") {
        let shuffleList=shuffle(listado);
        setList(shuffleList);
    }else {
        setList(listado);
        }
      
  }, []);
  const getListaProducto =async () => {
    const lista = await ApiCall.invokeGET("/productos");
    //console.log(lista);
  }
  const getListaCiudades =async () => {
    const lista = await ApiCall.invokeGET("/ciudades");
    //console.log(lista);
    }

  const shuffle=(array)=> {
    let currentIndex = array.length;
    let  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

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
        }}
      >
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useStateContext = () => useContext(StateContext);
