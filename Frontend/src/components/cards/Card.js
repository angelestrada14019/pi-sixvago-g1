import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import useWindowDimensions from "../../utils/useWindowDimensions";
import Stars from "../stars/Stars";
import useAvgScore from "../stars/useAvgScore";
import Favorito from "../favorito/Favorito";
const Card = ({ data,enableFav }) => {
  const { loading } = useStateContext();
  const { width } = useWindowDimensions();
  let imgHeight = width < 600 ? "205px" : "100%";
  let imgWidth = width < 600 ? "100%" : "50%";
  let textHeight = width < 600 ? "90px" : "120px";
  let textMarginTop = width < 600 ? "7px" : "10px";
  const { avScore, avValue } = useAvgScore({ data, id: data?.productos_id });

  return (
    <div className="card" id={data?.productos_id}>
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
        <>
        <img
          className="card-img"
          src={
            data.categorias_id !== undefined &&
            `${data.listadeimagenes[0]?.urlImagen}`
          }
          alt={
            data.categorias_id !== undefined && data.listadeimagenes[0]?.titulo
          }
        />
        <div className="favorito">
        <Favorito producto={data} enableFav={enableFav}/>
        </div>
        </>
      )}
      <div className="card-body">
        {/* categoría del producto, el nombre, ubicación, la descripción. Y un botón */}

        {loading ? (
          <Skeleton variant="text" width={120} />
        ) : (
          <p className="card-category">
            {data.categorias_id !== undefined &&
              `${data.categorias_id.titulo.toUpperCase()}`}
            <Stars data={data} />
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
            {data.categorias_id !== undefined &&
            (
                data.nombre.length<=16 ?
            `${data.nombre}`:`${data.nombre.slice(0,16)}...`
               )         
            }
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
            <button className="card-button" id="ver-mas">Ver más</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
