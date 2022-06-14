import Cards from "../cards/Cards";
import Categories from "../cards/Categories";
import Skeleton from "@mui/material/Skeleton";
import "./main.css";

const Main = () => {
  return (
    <div className="container">
      <Categories />
      <section className="cards-section">
        <h2 className="section-h2">Recomendaciones</h2>
        <Cards />
      </section>
    </div>
  );
};

export default Main;
