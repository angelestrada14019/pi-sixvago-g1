import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import { useStateContext } from "../../contexts/ContextProvider";
const ContainerFavorito = () => {
  const [fav, setFav] = useState([]);
  const { favoritos, setFavoritos } = useStateContext();
  const [enableFav, setEnableFav] = useState(false);
  useEffect(() => {
    setFav(favoritos);
  }, [favoritos]);
  return (
    <div>
      <div className="cards">
        {fav?.length > 0 ? (
          fav?.map((product, i) => (
            <Card data={product} enableFav={enableFav} key={`cards-${i}`} />
          ))
        ) : (
          <p>No hay productos favoritos</p>
        )}
      </div>
    </div>
  );
};

export default ContainerFavorito;
