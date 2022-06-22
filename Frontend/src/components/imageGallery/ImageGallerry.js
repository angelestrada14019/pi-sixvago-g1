import ImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import ApiCall from "../../utils/ApiCall";
import "./imageGallery.css";

// const styleBox = {
//   width: "50%",
//   height: "60%",
// };
const styleModal = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ImageGallerry = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProducto();
  }, []);

  function selectFewerProps(show) {
    const { imagenes_id, urlImagen } = show;
    const newObj = {
      id: imagenes_id,
      original: urlImagen,
      thumbnail: urlImagen,
    };
    return newObj;
  }

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    setProducto(productoObtenido.body);
    const newImage = productoObtenido.body.listadeimagenes.map(selectFewerProps);
    setImagenes(newImage);
  };

  return (
    <div className="image_gallery_container">
      {/* {console.log("galeria imagenes",imagenes)} */}
      <div className="icon_social">
        <i className="fa-solid fa-share-nodes"></i>
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="gallery">
        {producto?.listadeimagenes?.slice(0, 5).map((image) => (
          <div className="gallery-image" key={image.imagenes_id}>
            <img
              src={image.urlImagen}
              alt={image.titulo}
              style={{ width: "100%" }}
            />
          </div>
        ))}
        <p className="gallery-button" onClick={() => setOpen(true)}>
          Ver más
        </p>
      </div>
      <div className="modal_container">
        <Modal sx={styleModal} open={open} onClose={() => setOpen(false)}>
          <div className="image_Container">
            <div
              className="close_gallerry_image-button"
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
            <ImageGallery
              autoPlay={true}
              items={imagenes}
              showPlayButton={false}
              showFullscreenButton={false}
              slideDuration={450}
              slideInterval={3000}
              showIndex={false}
            />
          </div>
        </Modal>
      </div>
      <div className="container-gallery_image">
        <div className="icon_social">
          <i className="fa-solid fa-share-nodes"></i>
          <i className="fa-regular fa-heart"></i>
        </div>

        <ImageGallery
          autoPlay={true}
          items={imagenes}
          showPlayButton={false}
          showFullscreenButton={false}
          slideDuration={450}
          slideInterval={3000}
          showIndex={true}
          showThumbnails={false}
          showNav={false}
        />
      </div>
    </div>
  );
};

export default ImageGallerry;
