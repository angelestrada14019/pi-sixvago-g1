import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";

const useAvgScore = ({ data, id }) => {
  const { cardCategory, list, pageNumber } = useStateContext();
  const [avScore, setAvScore] = useState(0);
  const [avValue, setAvValue] = useState("Sin Calificar");

  useEffect(() => {
    if (data || id) {
      productAvarageScore();
    }
  }, [data, cardCategory, list]);

  const productAvarageScore = async () => {
    let getId = data.productos_id || id;
    const response = await ApiCall.invokeGET(`/puntuacion/producto/${getId}`);
    const body = response.body;
    let sum = 0;
      body?.forEach((score) => {
        sum += score.puntuacion;
        setAvScore(Math.round(sum / body.length));
        if (Math.round(sum / body.length) === 1) {
          setAvValue("Malo");
        } else if (Math.round(sum / body.length) === 2) {
          setAvValue("Regular");
        } else if (Math.round(sum / body.length) === 3) {
          setAvValue("Bueno");
        } else if (Math.round(sum / body.length) === 4) {
          setAvValue("Muy bueno");
        } else if (Math.round(sum / body.length) === 5) {
          setAvValue("Excelente");
        } else {
          setAvValue("Sin Calificar");
        }
      });
  };

  return { avScore, avValue };
};

export default useAvgScore;
