import React, { useState, useEffect } from "react";
import camera from "../../img/camera.png";
import batsu2 from "../../img/batsu2.png";

import "../../styles.css";
// import { Input } from "@douyinfe/semi-ui";

const PlantImg = (props: any) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const increaseImages = () => {
    document.getElementById("image-input")!.click();
  };

  const handleImageChange = async (e: any) => {
    const files: File[] = Array.from(e.target.files);
    props.setIncreaseImgs((prevImgs: File[]) => [...prevImgs, ...files]);

    const newPreviews = files.map((file: File) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImagePreviews((prevImgs) => prevImgs.filter((_, i) => i !== index));
    props.setIncreaseImgs((prevImgs: File[]) =>
      prevImgs.filter((_, i) => i !== index)
    );
  };

  //表示から編集画面に行った時の処理↓
  const plantDetails = props?.plantDetails;
  function base64ToFile(base64Data: string, fileName: string): File {
    const validBase64Data = base64Data.replace(
      /^data:image\/[a-zA-Z]+;base64,/,
      ""
    );
    const byteCharacters = atob(validBase64Data);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "image/png" });
    const file = new File([blob], fileName, { type: "image/png" });
    return file;
  }

  useEffect(() => {
    if (plantDetails && plantDetails?.images?.length > 0) {
      const editFiles = plantDetails.images.map((img: any) => {
        return base64ToFile(img.base64Data, img.fileName);
      });
      props.setIncreaseImgs(() => [...editFiles]);

      const newPreviews = editFiles.map((file: File) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(() => [...newPreviews]);
    }
  }, [plantDetails, plantDetails?.images]);

  return (
    <div style={{ marginBottom: "30px" }}>
      <div
        style={{
          marginTop: "0px",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {imagePreviews.map((preview, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              width: "100px",
              height: "120px",
              marginRight: "10px",
              marginBottom: "0px",
              overflow: "hidden",
              borderRadius: "7px",
              position: "relative",
              border: "2px solid #9BB598",
            }}
          >
            <img
              src={preview}
              alt={`Preview ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: "0px",
                right: "-5px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              <img
                src={batsu2}
                alt=""
                style={{
                  color: "red",
                  maxWidth: "20px",
                  maxHeight: "20px",
                }}
              />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={increaseImages}
          style={{
            cursor: "pointer",
            width: "70px",
            height: "70px",
            position: "relative", // 位置を相対的に調整
            top: imagePreviews.length === 0 ? "0px" : "-40px",
            backgroundColor: "white",
            border: "2px solid #B0B0B0",
            fontSize: "16px",
            borderRadius: "5px",
          }}
        >
          <img
            src={camera}
            alt=""
            style={{
              // marginTop: "60px",
              opacity: "0.5",
              maxWidth: "30px",
              maxHeight: "30px",
            }}
          />
        </button>
        <input
          type="file"
          id="image-input"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        ></input>
      </div>
    </div>
  );
};

export default PlantImg;
