import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";

const Stars = ({ data }) => {
  const { cardCategory, list, pageNumber } = useStateContext();
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [allScores, setAllScores] = useState([]);
  const { validateToken } = useContext(AuthContext);

  useEffect(() => {
    getAllScores();
    if (validateToken()) {
      getAllScores();
      userAlreadyScoredCard();
      productStars();
    }
  }, [data, cardCategory, list, pageNumber]);

  const getAllScores = async () => {
    const response = await ApiCall.invokeGET(`/puntuacion`);
    setAllScores(response.body);
  };

  const handleStarClick = async (e) => {
    if (validateToken()) {
      sendScore(e.target.id);
    }
  };

  const productStars = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const response = await ApiCall.invokeGET(`/puntuacion/usuario/${user.id}`);
    const cardScore = response.body;
    for (let i = 0; i < cardScore.length; i++) {
      const scoredCard = cardScore[i];
      console.log(
        scoredCard.usuarios.id === user.id &&
          scoredCard.productosProductos.productos_id === data.productos_id
      );
      if (
        scoredCard.usuarios.id === user.id &&
        scoredCard.productosProductos.productos_id === data.productos_id
      ) {
        if (scoredCard.puntuacion === 1) {
          setStar1(true);
          setStar2(false);
          setStar3(false);
          setStar4(false);
          setStar5(false);
        } else if (scoredCard.puntuacion === 2) {
          setStar1(true);
          setStar2(true);
          setStar3(false);
          setStar4(false);
          setStar5(false);
        } else if (scoredCard.puntuacion === 3) {
          setStar1(true);
          setStar2(true);
          setStar3(true);
          setStar4(false);
          setStar5(false);
        } else if (scoredCard.puntuacion === 4) {
          setStar1(true);
          setStar2(true);
          setStar3(true);
          setStar4(true);
          setStar5(false);
        } else {
          setStar1(true);
          setStar2(true);
          setStar3(true);
          setStar4(true);
          setStar5(true);
        }
      } else {
        setStar1(false);
        setStar2(false);
        setStar3(false);
        setStar4(false);
        setStar5(false);
      }
    }
  };

  const sendScore = async (score) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const cardScore = data
      ? allScores.filter(
          (card) => card.productosProductos.productos_id === data.productos_id
        )
      : null;
    if (user) {
      let isScored = await userAlreadyScoredCard();
      if (!isScored) {
        try {
          const response = await ApiCall.invokePOST(`/puntuacion`, {
            puntuacion: score,
            usuarios: {
              id: user.id,
            },
            productosProductos: {
              productos_id: data.productos_id,
            },
          });
        } catch (error) {
          console.log(error);
        } finally {
          productStars();
        }
      } else {
        const scoreId = cardScore.find(
          (scoredCard) => scoredCard.usuarios.id === user.id
        ).id;
        try {
          const response = await ApiCall.invokePUT(`/puntuacion`, {
            id: scoreId,
            puntuacion: score,
            usuarios: {
              id: user.id,
            },
            productosProductos: {
              productos_id: data.productos_id,
            },
          });
        } catch (error) {
          console.log(error);
        } finally {
          productStars();
        }
      }
    }
  };

  const userAlreadyScoredCard = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const response = await ApiCall.invokeGET(`/puntuacion/usuario/${user.id}`);
    const cardScore = response.body;
    let scored = false;
    if (cardScore) {
      cardScore.forEach((scoredCard) => {
        if (
          scoredCard.usuarios.id === user.id &&
          scoredCard.productosProductos.productos_id === data.productos_id
        ) {
          scored = true;
        }
      });
    }
    return scored;
  };

  return (
    <>
      {!validateToken() ? null : (
        <>
          <i
            className={`fa-solid fa-star ${star1 ? "enabled" : "disabled"}`}
            id="1"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${star2 ? "enabled" : "disabled"}`}
            id="2"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${star3 ? "enabled" : "disabled"}`}
            id="3"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${star4 ? "enabled" : "disabled"}`}
            id="4"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${star5 ? "enabled" : "disabled"}`}
            id="5"
            onClick={handleStarClick}
          ></i>
        </>
      )}
    </>
  );
};

export default Stars;
