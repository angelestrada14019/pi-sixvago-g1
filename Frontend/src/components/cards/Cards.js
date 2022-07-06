import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Card from "./Card";
import "./cards.css";

const Cards = () => {
  const { cardCategory, list, pageNumber, setLoading } = useStateContext();
  const productsPerPage = 4;
  const pagesVisited = pageNumber * productsPerPage;
  const [enableFav,setEnableFav]=useState(true);

  useEffect(() => {
    if (cardCategory !== "") {
      setLoading(true);
    }
    return () => {
      setLoading(false);
    };
  }, [cardCategory]);

  return (
    <div className="cards">
      {list?.length === 0 ? (
        <>
          <Card />
          <Card />
          <Card />
          <Card />
        </>
      ) : (
        list?.slice(pagesVisited, pagesVisited + productsPerPage)
          .map((product, i) => <Card data={product} enableFav={enableFav} key={`cards-${i}`} />)
      )}
    </div>
  );
};

export default Cards;
