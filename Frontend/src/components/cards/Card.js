import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import useWindowDimensions from "../../utils/useWindowDimensions";

const Card = ({ data }) => {
  const { loading } = useStateContext();
  const { width } = useWindowDimensions();
  let imgHeight = width < 577 ? "205px" : "100%";
  let imgWidth = width < 577 ? "100%" : "50%";
  let textHeight = width < 577 ? "90px" : "120px";
  let textMarginTop = width < 577 ? "7px" : "10px";

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
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
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
            <h2>8</h2>
          )}
          {loading ? <Skeleton variant="text" width={60} /> : <p>Muy bueno</p>}
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
