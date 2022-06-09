import Card from "./Card";
import "./cards.css";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import PaginationControll from "../pagination/PaginationControll";
import ApiCall from "../../utils/ApiCall";
const Cards = () => {
  const {
    cardCategory,
    list,
    setList,
    product,
    pageNumber,
    setPageNumber,
    loadingFnChange,
    location,
    loading,
  } = useStateContext();
  const productsPerPage = 4;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = list
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product, i) => <Card data={product} key={`cards-${i}`} />);

  useEffect(() => {
    productosPorCategoria();
  }, [cardCategory, loading]);

  // const productFiltro = (lista) => {
  //   if (cardCategory === "") {
  //     setList(lista);
  //   } else {
  //     let listaFiltrada = lista.filter(
  //       (item) => item.category === cardCategory
  //     ); //en vez de esto se puede usar un queryParams para hacer la consulta por fetch
  //     setList(listaFiltrada);
  //   }
  // };
  
  const productosPorCategoria = async () => {
    const filtroQuery = await ApiCall.invokeGET(`/productos/categorias`, [
      `tituloCategoria=${cardCategory}`,
    ]);

    setList(filtroQuery);

    //    const categorias = await ApiCall.invokeGET(`/categorias`);
    //    console.log(categorias);
  };
  
 
  const pageCount = Math.ceil(list.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <section className="cards-section">
      <h2 className="section-h2">Recomendaciones</h2>
      <div className="cards">{displayProducts}</div>
      <div>
        {loadingFnChange && (
          <PaginationControll pageCount={pageCount} changePage={changePage} />
        )}
      </div>
    </section>
  );
};

export default Cards;
