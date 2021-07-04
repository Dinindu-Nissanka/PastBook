import React, { useState } from "react";
import Gallery from "react-grid-gallery";
import { Button } from "@material-ui/core";
import "./image-picker.css";

const ImagePicker = ({ uploadedImages, onSave }) => {
  const [images, setImages] = useState(
    uploadedImages.map((item) => ({
      ...item,
      src: item.picture,
      thumbnail: item.picture,
      thumbnailWidth: 320,
      thumbnailHeight: 320,
    }))
  );

  const onSelectImage = (index, image) => {
    const imagesCopy = images.slice();
    const img = imagesCopy[index];
    if (img.hasOwnProperty("isSelected")) img.isSelected = !img.isSelected;
    else img.isSelected = true;
    setImages(imagesCopy);
  };

  const getSelectedImages = () => {
    var selected = [];
    for (var i = 0; i < images.length; i++)
      if (images[i].isSelected === true) selected.push(i);
    return selected;
  };

  return (
    <>
      <div className="image-picker-header">
        You have not selected your favourite photo grid yet
        <br></br>
        Please select 9 photos to create your photo grid
      </div>
      <div className="image-picker-container">
        <Gallery
          images={images}
          onSelectImage={onSelectImage}
          showLightboxThumbnails={true}
        />
      </div>
      <Button
        // class="image-picker-save"
        variant="contained"
        color="primary"
        onClick={() => onSave(getSelectedImages())}
      >
        Save
      </Button>
    </>
  );
};

export default ImagePicker;
