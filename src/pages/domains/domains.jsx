import React, { useState } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDateAndHour } from "../../utils/getDate";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import "./domains.css";

const Domains = () => {
  const user = useSelector((state) => state.user);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateFrom === "" || dateTo === "" || id === "") {
      notify_error("you must fill in all fields");
      return;
    }
    notify_Info("Searching");
    try {
      const response = await api.getSnowData(dateFrom, dateTo, id, user.token);
      if (!response) {
        notify_error("no results");
        return;
      }
      console.log(response);
      const updatedData = [...data];
      updatedData.unshift({
        date: getCurrentDateAndHour(),
        id: id,
        countTrue: response.resp[0].COUNT,
        countFalse: response.resp[1].COUNT,
      });
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="snowPage-container">
      <form onSubmit={handleSubmit}>
        <Box>
          <h1>Black Pages</h1>
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
          <label>
            ID:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </Box>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>ID</th>
            <th>Passed</th>
            <th>Did not pass</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data?.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.id}</td>
                <td className="countFalse">{item.countFalse}</td>
                <td className="countTrue">{item.countTrue}</td>
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

export default Domains;
