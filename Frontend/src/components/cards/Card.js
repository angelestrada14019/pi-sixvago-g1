import { Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";
import useWindowDimensions from "../../utils/useWindowDimensions";

const Card = ({ data, allScores, getAllScores }) => {
  const { cardCategory, list, setList, pageNumber, loading, setLoading } =
    useStateContext();
  const { width } = useWindowDimensions();
  let imgHeight = width < 600 ? "205px" : "100%";
  let imgWidth = width < 600 ? "100%" : "50%";
  let textHeight = width < 600 ? "90px" : "120px";
  let textMarginTop = width < 600 ? "7px" : "10px";
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [avScore, setAvScore] = useState(0);
  const [avValue, setAvValue] = useState("");
  const { validateToken } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      productAvarageScore();
      if (validateToken()) {
        getAllScores();
        userAlreadyScoredCard();
        productStars();
      }
    }
  }, [data, cardCategory, list, pageNumber]);

  const handleStarClick = async (e) => {
    if (validateToken()) {
      sendScore(e.target.id);
    }
  };

  const productStars = async (id) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const cardScore = await getStarsByUser();
    cardScore.forEach((scoredCard) => {
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
        } else if (scoredCard.puntuacion === 5) {
          setStar1(true);
          setStar2(true);
          setStar3(true);
          setStar4(true);
          setStar5(true);
        } else {
          setStar1(false);
          setStar2(false);
          setStar3(false);
          setStar4(false);
          setStar5(false);
        }
      }
    });
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

  const getStarsByUser = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    let body = null;
    if (user) {
      const response = await ApiCall.invokeGET(
        `/puntuacion/usuario/${user.id}`
      );
      body = response.body;
    }
    return body;
  };

  const userAlreadyScoredCard = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const cardScore = await getStarsByUser();
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

  const productAvarageScore = async () => {
    const response = await ApiCall.invokeGET(
      `/puntuacion/producto/${data.productos_id}`
    );
    const body = response.body;
    let sum = 0;
    if (body.length >= 0) {
      body.forEach((score) => {
        sum += score.puntuacion;
        setAvScore(Math.round(sum / body.length));
        if (Math.round(sum / body.length) === 1) {
          setAvValue("Malo");
        } else if (Math.round(sum / body.length) === 2) {
          setAvValue("Regular");
        } else if (Math.round(sum / body.length) === 3) {
          setAvValue("Bueno");
        } else if (Math.round(sum / body.length) === 4) {
          setAvValue("Muy bueno");
        } else if (Math.round(sum / body.length) === 5) {
          setAvValue("Excelente");
        } else {
          setAvValue("Sin Calificar");
        }
      });
    } else {
      setAvScore(0);
      setAvValue("Sin Calificar");
    }
  };

  return (
    <div className="card">
      {loading ? (
        <Skeleton
          variant="rectangular"
          sx={{
            minWidth: imgWidth,
            height: imgHeight,
            borderRadius: "8px 0px 0px 8px",
          }}
        />
      ) : (
        <img
          className="card-img"
          src={
            data.categorias_id !== undefined &&
            `${data.listadeimagenes[0].urlImagen}`
          }
          alt={
            data.categorias_id !== undefined && data.listadeimagenes[0].titulo
          }
        />
      )}
      <div className="card-body">
        {/* categoría del producto, el nombre, ubicación, la descripción. Y un botón */}

        {loading ? (
          <Skeleton variant="text" width={120} />
        ) : (
          <p className="card-category">
            {data.categorias_id !== undefined &&
              `${data.categorias_id.titulo.toUpperCase()}`}
            {!validateToken() ? null : (
              <>
                <i
                  className={`fa-solid fa-star ${
                    star1 ? "enabled" : "disabled"
                  }`}
                  id="1"
                  onClick={handleStarClick}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    star2 ? "enabled" : "disabled"
                  }`}
                  id="2"
                  onClick={handleStarClick}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    star3 ? "enabled" : "disabled"
                  }`}
                  id="3"
                  onClick={handleStarClick}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    star4 ? "enabled" : "disabled"
                  }`}
                  id="4"
                  onClick={handleStarClick}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    star5 ? "enabled" : "disabled"
                  }`}
                  id="5"
                  onClick={handleStarClick}
                ></i>
              </>
            )}
          </p>
        )}
        <div className="card-rating">
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={35}
              height={25}
              sx={{ borderRadius: "10px" }}
            />
          ) : (
            <h2>{avScore}</h2>
          )}
          {loading ? <Skeleton variant="text" width={60} /> : <p>{avValue}</p>}
        </div>

        {loading ? (
          <Skeleton
            variant="rectangular"
            width={150}
            height={24}
            sx={{
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          />
        ) : (
          <h2 className="card-title">
            {data.categorias_id !== undefined && `${data.nombre}`}
          </h2>
        )}
        {loading ? (
          <Skeleton variant="text" width={60} />
        ) : (
          <p className="card-location">
            {data.categorias_id !== undefined && `${data.ciudades_id.nombre}`}
          </p>
        )}
        {loading ? (
          <Skeleton
            variant="text"
            height={textHeight}
            sx={{ marginTop: textMarginTop }}
          />
        ) : (
          <p className="card-description">
            {data.categorias_id !== undefined &&
              `${data.descripcion.slice(0, 100)}`}
            <Link to={`/producto/${data.productos_id}`}>
              <span> mas...</span>
            </Link>
          </p>
        )}
        {loading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              minWidth: "50%",
              borderRadius: "5px",
              minHeight: "40px",
              margin: "0 auto",
              marginBottom: "12px",
            }}
          />
        ) : (
          <Link to={`/producto/${data.productos_id}`}>
            <button className="card-button">Ver más</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
