import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";

const Stars = ({ data }) => {
  const { cardCategory, list, pageNumber } = useStateContext();
  const [stars, setStars] = useState([
    {
      id: null,
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
    },
  ]);
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
      if (
        scoredCard.usuarios.id === user.id &&
        scoredCard.productosProductos.productos_id === data.productos_id
      ) {
        switch (scoredCard.puntuacion) {
          case 1:
            setStars({
                id: scoredCard.productosProductos.productos_id ,
                star1: true,
                star2: false,
                star3: false,
                star4: false,
                star5: false,
              });
            break;
          case 2:
            setStars({
                id: scoredCard.productosProductos.productos_id ,
                star1: true,
                star2: true,
                star3: false,
                star4: false,
                star5: false,
              });
            break;
            
          case 3:
            setStars({
                id: scoredCard.productosProductos.productos_id ,
                star1: true,
                star2: true,
                star3: true,
                star4: false,
                star5: false,
              });
            break;
          case 4:
            setStars({
              id: scoredCard.productosProductos.productos_id ,
              star1: true,
              star2: true,
              star3: true,
              star4: true,
              star5: false,
            });
            break;
          case 5:
            setStars({
                id: scoredCard.productosProductos.productos_id ,
                star1: true,
                star2: true,
                star3: true,
                star4: true,
                star5: true,
              });
            break;

          default:
            setStars({
                id: scoredCard.productosProductos.productos_id ,
                star1: false,
                star2: false,
                star3: false,
                star4: false,
                star5: false,
              });
            break;
        }
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
            className={`fa-solid fa-star ${( data?.productos_id===stars.id && stars.star1) ? "enabled" : "disabled"}`}
            id="1"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${( data?.productos_id===stars.id && stars.star2) ? "enabled" : "disabled"}`}
            id="2"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${( data?.productos_id===stars.id && stars.star3) ? "enabled" : "disabled"}`}
            id="3"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${( data?.productos_id===stars.id && stars.star4) ? "enabled" : "disabled"}`}
            id="4"
            onClick={handleStarClick}
          ></i>
          <i
            className={`fa-solid fa-star ${( data?.productos_id===stars.id && stars.star5) ? "enabled" : "disabled"}`}
            id="5"
            onClick={handleStarClick}
          ></i>
        </>
      )}
    </>
  );
};

export default Stars;
