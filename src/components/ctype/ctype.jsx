import React, { useState } from "react";
import { Box } from "../box/box";
import { Select } from "../../origins/select";
import { ImageUploader } from "../../origins/imageUploader";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { useSelector, useDispatch } from "react-redux";
import "./ctype.css";

export const Ctype = (props) => {
  const data = ["tag", "url"];
  const [type, setType] = useState("");
  const [whiteImg, setWhiteImg] = useState("");
  const [blackImg, setBlackImg] = useState("");
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
      }
      console.log({
        whiteImg,
        blackImg,
      });
    } catch (error) {}
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
            <ImageUploader title={"White Img:"} setImage={setWhiteImg} />
            <ImageUploader title={"Black Img:"} setImage={setBlackImg} />
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
