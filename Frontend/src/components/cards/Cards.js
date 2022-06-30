import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";
import Card from "./Card";
import "./cards.css";

const Cards = () => {
  const { cardCategory, list, setList, pageNumber, loading, setLoading } =
    useStateContext();
  const productsPerPage = 4;
  const pagesVisited = pageNumber * productsPerPage;
  const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    getAllScores();
    if (cardCategory !== "") {
      setLoading(true);
    }
    return () => {
      setLoading(false);
    };
  }, [cardCategory]);

  const getAllScores = async () => {
    const response = await ApiCall.invokeGET(`/puntuacion`);
    setAllScores(response.body);
  };

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
        list
          .slice(pagesVisited, pagesVisited + productsPerPage)
          .map((product, i) => (
            <Card
              data={product}
              allScores={allScores}
              getAllScores={getAllScores}
              key={`cards-${i}`}
            />
          ))
      )}
    </div>
  );
};

export default Cards;
