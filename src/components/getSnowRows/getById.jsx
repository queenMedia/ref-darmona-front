import React, { useState } from "react";
import { Box } from "../box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDateAndHour } from "../../utils/getDate";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { Select } from "../../origins/select";
import { snowColums } from "../../assets/data/snowColums";
import { handleCopy } from "../../utils/notify";
import "./getSnowRows.css";

const GetById = () => {
  const user = useSelector((state) => state.user);
  const [cmpId, setCmpId] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    notify_Info("Searching");
    try {
      const response = await api.getCmpId(cmpId);
      if (!response || response?.resp?.length < 1) {
        notify_error("no results");
        return;
      }
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="snowPage-container">
      <form onSubmit={handleSubmit}>
        <Box>
          <h1>Find User By Id</h1>
          <input
            placeholder="Cmp Id"
            type="text"
            value={cmpId}
            onChange={(e) => setCmpId(e.target.value)}
          />
          <br />
          <br />
          <br />
          <button type="submit">Submit</button>
        </Box>
      </form>

      <div>
        <div>
          <strong>user:</strong> RonyDerra
        </div>
        <div>
          <strong>cmpName:</strong> ronystagingtest
        </div>
        <div>
          <strong>cmpUrl:</strong>{" "}
          https://bnor.gasrstar.com/?cmp=5a20f72a-b1c9-4638-bddf-5d88f192e323
        </div>
        <div>
          <strong>cmpId:</strong> 5a20f72a-b1c9-4638-bddf-5d88f192e323
        </div>
        <div>
          <strong>createdAt:</strong> 2023-09-11T17:33:08.894Z
        </div>
      </div>
    </div>
  );
};

export default GetById;
