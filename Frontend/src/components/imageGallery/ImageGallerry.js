import ImageGallery from "react-image-gallery";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import ApiCall from "../../utils/ApiCall";
import "./imageGallery.css";
import { SimpleShareButtons } from "react-simple-share";
const styleModal = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const styleSocial = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
};

const ImageGallerry = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [producto, setProducto] = useState([]);
  const location = useLocation();
  const [desable, setDesable] = useState(true);

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
    const newImage =
      productoObtenido.body.listadeimagenes.map(selectFewerProps);
    setImagenes(newImage);
  };
  const handleSocialClick = () => {
    setDesable(desable?false:true);
  };

  return (
    <div className="image_gallery_container">
      {/* {console.log("galeria imagenes",imagenes)} */}
      <div className="icon_social">
        <i
          onClick={handleSocialClick}
          className="fa-solid fa-share-nodes social fa-2x"
        ></i>
        <i className="fa-regular fa-heart fa-2x"></i>
        <div>
          {!desable && (
            <SimpleShareButtons
              url={window.location.href}
              whitelist={["Facebook", "Twitter", "LinkedIn"]}
            />
          )}
        </div>
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
          <i
            onClick={handleSocialClick}
            className="fa-solid fa-share-nodes social fa-2x"
          ></i>
          <i className="fa-regular fa-heart fa-2x"></i>
          <div>
          {!desable && (
            <SimpleShareButtons
              url={window.location.href}
              whitelist={["Facebook", "Twitter", "LinkedIn"]}
            />
          )}
        </div>
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
