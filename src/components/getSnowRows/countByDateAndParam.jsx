import React, { useState } from "react";
import { Box } from "../box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDateAndHour } from "../../utils/getDate";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { Select } from "../../origins/select/select.jsx";
import { snowColums } from "../../assets/data/snowColums";
import { handleCopy } from "../../utils/notify";
import { formatDate } from "../../utils/getDate.js"
import { betweenDates } from "../../assets/data/snowColums.js"
import "./getSnowRows.css";

const CountByDateAndParam = () => {
  const user = useSelector((state) => state.user);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [by, setBy] = useState("");
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("not_passed");
  const [showCostumDate, setShowCostumDate] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateFrom === "" || dateTo === "" || by === "") {
      notify_error("you must fill in all fields");
      return;
    }
    notify_Info("Searching");
    try {
      const response = await api.countByDateAndParam(
        dateFrom,
        dateTo,
        by,
        sortBy,
        user.token
      );
      if (!response || response?.resp?.length < 1) {
        notify_error("no results");
        return;
      }
      notify_success("found " + response.resp.length + " rows");
      setData(response.resp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSetId = (val) => {
    setData([]);
    setBy(val);
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
          <h1>Snow Rows</h1>
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
            data={snowColums}
            title={"Select by Column"}
            func={handleSetId}
          />
          <br />
          <button type="submit">Submit</button>
        </Box>
      </form>

      <table className="table">
        {data.length > 0 ? (
          <thead>
            <tr>
              <th>{by}</th>
              <th>passed</th>
              <th>not passed</th>
              <th>impressions skip</th>
              <th>query skip</th>
              <th>ip skip</th>
              <th>no endpoint skip</th>
            </tr>
          </thead>
        ) : (
          <></>
        )}
        <tbody>
          {data.length > 0 ? (
            data?.map((item, index) => (
              <tr key={index}>
                <td onClick={() => handleCopy(item[by.toUpperCase()])}>{`${item[
                  by.toUpperCase()
                ].slice(0, 20)}...`}</td>
                <td>{item.PASSED}</td>
                <td>{item.NOT_PASSED}</td>
                <td>{item.IMPRESSIONS_SKIP}</td>
                <td>{item.QUERY_RULES}</td>
                <td>{item.IP_BLOCKED}</td>
                <td>{item.NO_ENDPOINT_TO_DELIVER}</td>
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

export default CountByDateAndParam;
