import React, { Component } from "react";
import listaCategorias from "./categories.json";
import "./categories.css";

class Categories extends Component {
  render() {
    return (
      <section className="categories-section">
        <h2 className="section-h2">Buscar por tipo de alojamiento</h2>
        <div className="cardCategory">
          {listaCategorias.map((item, i) => {
            return (
              <div className="renderCategory" key={i}>
                <img
                  className="cardCategory-img"
                  src={`${item.img}`}
                  alt={item.name}
                />
                <h2>{item.name}</h2>
                <p>807.105 hoteles</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
export default Categories;
