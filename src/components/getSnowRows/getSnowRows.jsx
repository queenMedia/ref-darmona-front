import React, { useState } from "react";
import { Box } from "../box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDateAndHour } from "../../utils/getDate";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { Select } from "../../origins/select";
import "./getSnowRows.css";

const GetSnowRows = () => {
  const user = useSelector((state) => state.user);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [idList, setIdList] = useState([]);

  function getCmpValue(url) {
    // Create a URL object
    const urlObj = new URL(url);

    // Use URLSearchParams to get the "cmp" value
    const params = new URLSearchParams(urlObj.search);

    // Return the value of "cmp"
    return params.get("cmp");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateFrom === "" || dateTo === "" || id === "") {
      notify_error("you must fill in all fields");
      return;
    }
    notify_Info("Searching");
    try {
      const onlyId = getCmpValue(id);
      const response = await api.getSnowRows(
        dateFrom,
        dateTo,
        onlyId,
        user.token
      );
      if (!response || response?.resp?.length < 1) {
        notify_error("no results");
        return;
      }
      notify_success("found " +  response.resp.length + " rows")
      setData(response.resp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAliasSelect = (alias) => {
    const filterd = user?.cmps?.filter((i) => i.cmpUrl.includes(alias));
    setIdList(filterd.map((i) => i.cmpUrl));
  };

  return (
    <div className="snowPage-container">
      <form onSubmit={handleSubmit}>
        <Box>
          <h1>Snow Rows</h1>
          <label>
            Date From:
            <input
              className="input-date"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>
          <br />
          <label>
            Date To:
            <input
              className="input-date"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
          <br />
          <Select
            className="selectWidth"
            required={true}
            data={user.aliases}
            title={"Select Domain"}
            func={handleAliasSelect}
          />
          <br />
          <Select
            className="selectWidth"
            required={true}
            data={idList}
            title={"Select Link"}
            func={setId}
          />
          <br />
          <button type="submit">Submit</button>
        </Box>
      </form>

      <table className="table">
        {data.length > 0 ? (
          <thead>
            <tr>
              <th>Date</th>
              <th>IP</th>
              <th>GEO</th>
              <th>DEVICE</th>
              <th>BROWSER</th>
              <th>REASON</th>
            </tr>
          </thead>
        ) : (
          <></>
        )}
        <tbody>
          {data.length > 0 ? (
            data?.map((item, index) => (
              <tr key={index}>
                <td>{item.TS}</td>
                <td>{item.IP}</td>
                <td >{item.GEO}</td>
                <td >{item.DEVICE}</td>
                <td >{item.BROWSER}</td>
                <td >{item.REASON}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetSnowRows;
