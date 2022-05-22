import React, { useState, useCallback, useMemo } from "react";

import ImageCapture from "react-image-data-capture";
import imageAPI from "./imageAPI";

const MyImageCaptureComponent = () => {
  const [showImgCapture, setShowImgCapture] = useState(true);
  const config = useMemo(() => ({ video: true }), []);
  /*
    { video: true } - Default Camera View
    { video: { facingMode: environment } } - Back Camera
    { video: { facingMode: "user" } } - Front Camera
  */
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgStat, setImgStat] = useState('Click Me');
  let imageSent;

  const onCapture = (imageData) => {
    // read as webP
    setImgSrc(imageData.webP);
    // read as file
    setImgFile(imageData.file);
    // Unmount component to stop the video track and release camera
    setShowImgCapture(false);

  };

  //imageSent = imageAPI(imgFile)

  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  // imgFile can be used as a file upload form submission
  const formData = new FormData();
  formData.append("file", imgFile);


  return (
    <div>
      {showImgCapture && (
        <ImageCapture
          onCapture={onCapture}
          onError={onError}
          width={300}
          userMediaConfig={config}
        />
      )}
      {imgSrc && (
        <div>
          <div>Captured Image:</div>
          <img src={imgSrc} alt="captured-img" />
        </div>
      )}
      <button onClick={ async () => { let name = await imageAPI(imgFile) 
                                      setImgStat('Sent')} }>{imgStat}</button>
    </div>
  );
};

export default MyImageCaptureComponent;