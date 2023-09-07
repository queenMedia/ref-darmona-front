import React, { useState } from "react";
import { Box } from "../box/box";
import { Select } from "../../origins/select";
import { ImageUploader } from "../../origins/imageUploader";
import "./ctype.css";

export const Ctype = (props) => {
  const data = ["tag", "url"];
  const [type, setType] = useState("");

  const handleCtypeChange = (type) => {
    try {
      props.setType(type);
      setType(type);
    } catch (error) {
      console.log(error.message);
    }
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
            <ImageUploader title={"Upload White Image"} />
            <ImageUploader title={"Upload Black Image"} />
            <span><u><b>Get Links</b></u></span>
          </div>
        )}
      </div>
    </Box>
  );
};
