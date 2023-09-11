import React, { useState } from "react";
import { Box } from "../box/box";
import { api } from "../../utils/api";
import { useSelector } from "react-redux";
import { notify_error, notify_Info } from "../../utils/notify";

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
         
          <button type="submit">Submit</button>
        </Box>
      </form>

      {data?.user !== undefined ? (
        <div className="details-container">
          <div>
            <strong>User:</strong> {data.user}
          </div>
          <div>
            <strong>Cmp Name:</strong> {data.cmpName}
          </div>
          <div>
            <strong>Domain:</strong> {data.cmpUrl.replace('http://','').replace('https://','').split(/[/?#]/)[0]}
          </div>
          <div>
            <strong>Cmp Id:</strong> {data.cmpId}
          </div>
          <div>
            <strong>Created At:</strong> {data.createdAt.split("T")[0]}
          </div>
        </div>
        
      ) : (
        <></>
      )}
    </div>
  );
};

export default GetById;
