import React, { useEffect, useState } from "react";
import ImagePicker from "./components/image-picker";

function App() {
  const [images, setImages] = useState([]);
  const [isGridSelected, setIsGridSelected] = useState(false);

  useEffect(() => {
    const url =
      "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json ";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setImages(data.entries));
  }, []);

  const onSave = (selectedImages) => {
    if (selectedImages.length > 9) {
      alert("Only allowed to select 9 images");
    }
    if (selectedImages.length < 9) {
      alert("Please select 9 images");
    }
    if (selectedImages.length === 9) {
      setIsGridSelected(true);
    }
  };

  return <ImagePicker uploadedImages={images} onSave={onSave} />;
}

export default App;
