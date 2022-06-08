import { Link,useNavigate } from "react-router-dom";

const Card = ({ data }) => {
    const navigate = useNavigate();
    const handleVerMas = () => {
        navigate(`/producto/${data.id}`);
    }
  return (
    <div className="card">
      <img className="card-img" src={`${data.img}`} alt={data.title} />
      <div className="card-body">
        {/* categoría del producto, el nombre, ubicación, la descripción. Y un botón */}

        <p className="card-category">
          {`${data.category.toUpperCase()}`}
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </p>
        <div className="card-rating">
          <h2>8</h2>
          <p>Muy bueno</p>
        </div>

        <h2 className="card-title">{`${data.title}`}</h2>
        <p className="card-location">{`${data.location}`}</p>
        <p className="card-description">
          {`${data.description.slice(0, 100)}`}
        <Link to={`/producto/${data.id}`}>
          <span> mas...</span>
        </Link>
        </p>
        <Link to={`/producto/${data.id}`}>
          <button className="card-button">Ver más</button>
        </Link>

      </div>
    </div>
  );
};

export default Card;
