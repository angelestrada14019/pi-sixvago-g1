import { useEffect, useState } from "react";

const InputImagenes = ({ setImagenesProducto }) => {
  const [imagenes, setImagenes] = useState([{}]);
  const [value, setValue] = useState("");
  //   const [imgs, setImgs] = useState({});

  useEffect(() => {
    setImagenesProducto(imagenes);
  }, [imagenes]);

  const handleClickAdd = (e) => {
    setImagenes([
      ...imagenes,
      {
        urlImagen: "",
        titulo: "",
      },
    ]);
  };

  const handleClickRemove = (i) => {
    const list = [...imagenes];
    list.splice(i, 1);
    setImagenes(list);
  };

  const handleClickChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...imagenes];
    list[index].urlImagen = value;
    list[index].titulo = name;
    setImagenes(list);
  };

  return (
    <div className="input-cargaimagenes">
      {imagenes.map((imagen, i) => (
        <>
          <div className="datos-imagenes">
            <input
              type="text"
              name={`Imagen ${i}`}
              placeholder="Insertar https://"
              id="cargaImagen"
              className="propiedad"
              onChange={(e) => handleClickChange(e, i)}
            />
          </div>
          <div>
            {imagenes.length !== 1 && i !== imagenes.length - 1 && (
              <div className="botonAgregarAtributo">
                <i
                  onClick={() => handleClickRemove(i)}
                  className="fa-regular fa-rectangle-xmark fa-3x"
                ></i>
              </div>
            )}
            {imagenes.length - 1 === i && (
              <div className="botonAgregarAtributo2">
                <i
                  onClick={handleClickAdd}
                  className="fa fa-regular fa-square-plus fa-3x "
                ></i>
              </div>
            )}
            {/* <button>
              <i
                className="fa fa-regular fa-square-plus fa-3x "
                onClick={(e) => handleClick(e, i)}
              ></i>
            </button> */}
          </div>
        </>
      ))}
    </div>
  );
};

export default InputImagenes;
