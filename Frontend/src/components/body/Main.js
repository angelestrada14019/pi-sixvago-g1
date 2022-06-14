import Cards from "../cards/Cards";
import Categories from "../cards/Categories";
import "./main.css";

const Main = () => {
  return (
    <div className="container">
      <Categories />
      <Cards />
    </div>
  );
};

export default Main;
