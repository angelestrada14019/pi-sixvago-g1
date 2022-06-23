import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
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
      list
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((product, i) => <Card data={product} key={`cards-${i}`} />)
    );

  useEffect(() => {
    if (cardCategory !== "") {
      setLoading(true);
    }
    return () => {
      setLoading(false);
    }
  }, [cardCategory]);

  return <div className="cards">{displayProducts}</div>;
};

export default Cards;
