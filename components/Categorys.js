import React, { Component } from 'react';
import ListaCategorias from "./Categorias.json"
import './categories.css'


class Categorys extends Component {

  render() {
    return (
      <div className="cardCategory">
        {ListaCategorias.map((item, i) => {
          return (
            <div className="renderCategory" key={i}>
              <img className="cardCategory-img" src={`${item.img}`} alt={item.name} />
              <h2>{item.name}</h2>
              <p>807.105 hoteles</p>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Categorys;