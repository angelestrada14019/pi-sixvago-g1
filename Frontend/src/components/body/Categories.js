import React, { useEffect,useState } from "react";
import listaCategorias from "./categories.json";
import "./categories.css";
import { useStateContext } from "../../contexts/ContextProvider";

const Categories = () => {
    const { setCardCategory,setLocation,setPageNumber,setloadingFnChange } = useStateContext();
    
    const handleClick = (name,e) => {
        setPageNumber(0);
        setCardCategory(""); 
        setLocation(""); 
        setloadingFnChange(false);      
        setTimeout(() => {
            setloadingFnChange(true);
            setCardCategory(name);            
        }, 5);
    } 
    return (
      <section className="categories-section">
        <h2 className="section-h2">Buscar por tipo de alojamiento</h2>
        <div className="cardCategory">
          {listaCategorias.map((item, i) => {
            return (
              <div onClick={(e)=>handleClick(item.name,e)}  className="renderCategory" key={item.id}>
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
export default Categories;
