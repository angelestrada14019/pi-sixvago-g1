import "./main.css";
import Cards from "./Cards.js";
import Categories from "./Categories";

const Main = () => {
  return (
    <div className="container">
      <Categories />
      <Cards />
    </div>
  );
};

export default Main;
