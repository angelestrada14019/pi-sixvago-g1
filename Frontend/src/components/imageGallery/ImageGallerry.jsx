import ImageGallery from "react-image-gallery";
import React, { useState } from "react";
import "./imageGallery.css";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
const images = [
  {
    id: 0,
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    id: 1,
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    id: 2,
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    id: 3,
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    id: 4,
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    id: 5,
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    id: 6,
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
];
const styleBox = {
  width: "60%",
  height: "60%",
};
const styleModal = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ImageGallerry = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="image_gallery_container">
      <div className="icon_social">
        <i className="fa-solid fa-share-nodes"></i>
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="gallery">
        {images.slice(0, 5).map((image) => (
          <div className="gallery-image" key={image.id}>
            <img
              src={image.original}
              alt={image.original}
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
          <Box className="image_Container" sx={styleBox}>
            <div
              className="close_gallerry_image-button"
              onClick={() => setOpen(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
            <ImageGallery
              autoPlay={true}
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              slideDuration={450}
              slideInterval={3000}
              showIndex={false}
            />
          </Box>
        </Modal>
      </div>
      <div className="container-gallery_image">
        <div className="icon_social">
          <i className="fa-solid fa-share-nodes"></i>
          <i className="fa-regular fa-heart"></i>
        </div>

        <ImageGallery
          autoPlay={true}
          items={images}
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
