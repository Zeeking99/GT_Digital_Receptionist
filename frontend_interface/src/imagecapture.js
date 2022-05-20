/*
import React, { useCallback, useState, useMemo } from 'react';
import ImageCapture from 'react-image-data-capture';

function MyImageCaptureComponent() {
    const [imgSrc, setImgSrc] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const onCapture = (imageData) => {
      // read as webP
      setImgSrc(imageData.webP);
      // read as file
      setImgFile(imageData.file);
      // read as blob
      // imageData.blob
    };
    
    // Use useCallback to avoid unexpected behaviour while rerendering
    const onError = useCallback((error) => { console.log(error) }, []);
    
    // Use useMemo to avoid unexpected behaviour while rerendering
    const config = useMemo(() => ({ video: true }), []);
    /*
      { video: true } - Default Camera View
      { video: { facingMode: environment } } - Back Camera
      { video: { facingMode: "user" } } - Front Camera
    */
/*  
    // imgFile can be used as a file upload field form submission
    const formData = new FormData();
    formData.append("file", imgFile);
    
    return (
      <div>
        <ImageCapture
          onCapture={onCapture}
          onError={onError}
          width={300}
          userMediaConfig={config}
        />
        {imgSrc &&
          <div>
            <div>Captured Image:</div>
            <img src={imgSrc} alt="captured-img" />
          </div>
        }
      </div>
    );
}

export default MyImageCaptureComponent
*/


import React, { useState, useCallback, useMemo } from "react";

import ImageCapture from "react-image-data-capture";

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
  const onCapture = (imageData) => {
    // read as webP
    setImgSrc(imageData.webP);
    // read as file
    setImgFile(imageData.file);
    // Unmount component to stop the video track and release camera
    setShowImgCapture(false);
  };
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
    </div>
  );
};

export default MyImageCaptureComponent;