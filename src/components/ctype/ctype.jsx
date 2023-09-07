import React from "react";
import { Box } from "../box/box";
import { Select } from "../../origins/select";

export const Ctype = (props) => {
  const data = ["tag", "url"];
  return (
    <Box>
      <h1>Campaign type</h1>
      <Select
        required={true}
        data={data}
        title={"Select Ctype"}
        func={props.handleCtype}
      />
    </Box>
  );
};
