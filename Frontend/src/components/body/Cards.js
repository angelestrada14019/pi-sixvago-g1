import Card from "./Card";
import listado from "./listado.json";
import "./cards.css";

const Cards = () => {
  return (
    <section className="cards-section">
      <h2 className="section-h2">Recomendaciones</h2>
      <div className="cards">
        {listado.map((item, i) => (
          <Card data={listado[i]} key={[i]} />
        ))}
      </div>
    </section>
  );
};

export default Cards;
