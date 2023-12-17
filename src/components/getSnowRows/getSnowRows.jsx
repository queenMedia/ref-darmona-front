import React, { useState } from "react";
import { Box } from "../box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDateAndHour } from "../../utils/getDate";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { Select } from "../../origins/select/select.jsx";
import { formatDate } from "../../utils/getDate.js"
import { betweenDates } from "../../assets/data/snowColums.js"
import "./getSnowRows.css";

const GetSnowRows = () => {
  const user = useSelector((state) => state.user);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [idList, setIdList] = useState([]);
  const [showCostumDate, setShowCostumDate] = useState(false)

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
      notify_success("found " + response.resp.length + " rows")
      setData(response.resp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAliasSelect = (alias) => {
    const filterd = user?.cmps?.filter((i) => i.cmpUrl.includes(alias));
    const mapedFilterd = filterd.map((i) => i.cmpUrl)
    setIdList(mapedFilterd);
    setId(mapedFilterd[0])
  };

  const handleDateSelect = (selectedItem) => {
    let selectedDate;

    switch (selectedItem) {
      case "Today":
        selectedDate = new Date();
        setShowCostumDate(false)
        break;
      case "Last 2 Days":
        selectedDate = new Date(new Date().setDate(new Date().getDate() - 1));
        setShowCostumDate(false)
        break;
      case "Last 3 Days":
        selectedDate = new Date(new Date().setDate(new Date().getDate() - 2));
        setShowCostumDate(false)
        break;
      case "Last 4 Days":
        selectedDate = new Date(new Date().setDate(new Date().getDate() - 3));
        setShowCostumDate(false)
        break;
      case "Last 5 Days":
        selectedDate = new Date(new Date().setDate(new Date().getDate() - 4));
        setShowCostumDate(false)
        break;
      case "Last 6 Days":
        selectedDate = new Date(new Date().setDate(new Date().getDate() - 5));
        setShowCostumDate(false)
        break;
      case "Last Week":
        selectedDate = new Date(new Date().setDate(new Date().getDate() - 7));
        setShowCostumDate(false)
        break;
      case "Custom Date":
        setShowCostumDate(true)
        break;
      default:
        selectedDate = new Date();
        setShowCostumDate(false)
        break;
    }
    setDateFrom(formatDate(selectedDate))
    setDateTo(formatDate(new Date()))
  }

  return (
    <div className="snowPage-container">
      <form onSubmit={handleSubmit}>
        <Box>
          <h1>Reason information</h1>
          <Select
              className="selectWidth"
              required={true}
              data={betweenDates}
              title={"Select Date"}
              func={handleDateSelect}
            />
            {showCostumDate &&
              <div className="customDate-select">
                <label>
                  Date From:
                  <input
                    className="input-date"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    required={true}
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
                    required={true}
                  />
                </label>
              </div>}
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
              <th>GEO</th>
              <th>REASON</th>
              <th>Amount</th>
            </tr>
          </thead>
        ) : (
          <></>
        )}
        <tbody>
          {data.length > 0 ? (
            data?.map((item, index) => (
              <tr key={index}>
                <td>{item.GEO}</td>
                <td>{item.REASON}</td>
                <td >{item.NUMBER}</td>
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
