import React, { useState, useEffect, useRef } from "react";

export const ImageUploader = (props) => {
  const [fileName, setFileName] = useState("No file chosen...");
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      props.setImgName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        props.setImage(base64String);
      };
    }
  };

  useEffect(() => {
    // Using React refs to manipulate DOM
    if (fileInputRef.current) {
      fileInputRef.current.onchange = handleFileChange;
    }
  }, []);

  return (
    <div className="file-upload">
      <div className="file-upload-select" onClick={handleFileSelect}>
        <div className="file-select-button">{props.title}</div>
        <div className="file-select-name">{fileName}</div>
        <input
          required={true}
          type="file"
          name="file-upload-input"
          id="file-upload-input"
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
