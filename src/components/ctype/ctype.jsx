import React, { useState } from "react";
import { Box } from "../box/box";
import { Select } from "../../origins/select/select.jsx";
import { ImageUploader } from "../../origins/fileUploader/imageUploader";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../utils/api";
import "./ctype.css";

export const Ctype = (props) => {
  const data = ["tag", "url"];
  const [type, setType] = useState("");
  const [whiteImg, setWhiteImg] = useState("");
  const [blackImg, setBlackImg] = useState("");
  const [whiteImgName, setWhiteImgName] = useState("");
  const [blackImgName, setBlackImgName] = useState("");
  const [destinationDom, setDestinationDom] = useState("");
  const user = useSelector((state) => state.user);

  const handleCtypeChange = (type) => {
    try {
      props.setType(type);
      setType(type);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGetLinks = async () => {
    try {
      if (!whiteImg || !blackImg || !destinationDom) {
        notify_error("an image or domain is missing");
        return;
      }
      console.log({
        whiteImg,
        blackImg,
        destinationDom,
      });
      const resp = await api.uploadImg(
        user.token,
        whiteImgName,
        whiteImg,
        destinationDom
      );
      console.log(resp);
    } catch (error) { }
  };

  return (
    <Box>
      <h1>Campaign type</h1>
      <div className="ctype-body">
        <Select
          required={true}
          data={data}
          title={"Select Ctype"}
          func={handleCtypeChange}
        />
        {type === "tag" && (
          <div>
            <Select
              required={true}
              data={user.blackPageDomains.filter((i) => !i.includes("setish"))}
              title={"Select Domain"}
              func={setDestinationDom}
            />
            <ImageUploader
              title={"White Img:"}
              setImage={setWhiteImg}
              setImgName={setWhiteImgName}
            />
            <ImageUploader
              title={"Black Img:"}
              setImage={setBlackImg}
              setImgName={setBlackImgName}
            />
            <span>
              <u>
                <b onClick={handleGetLinks}>Get Links</b>
              </u>
            </span>
          </div>
        )}
      </div>
    </Box>
  );
};
