import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import PaginationControll from "../pagination/PaginationControll";
import ApiCall from "../../utils/ApiCall";
import Card from "./Card";
import "./cards.css";

const Cards = () => {
  const { cardCategory, list, setList, pageNumber, loading, setLoading } =
    useStateContext();
  const productsPerPage = 4;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts =
    list?.length === 0 ? (
      <>
        <Card />
        <Card />
        <Card />
        <Card />
      </>
    ) : (
      list.body
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((product, i) => <Card data={product} key={`cards-${i}`} />)
    );

  useEffect(() => {
    if (cardCategory !== "") {
      setLoading(true);
    }
  }, [cardCategory]);

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
  };

  return <div className="cards">{displayProducts}</div>;
};

export default Cards;
