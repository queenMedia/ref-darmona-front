import React, { useState } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDateAndHour } from "../../utils/getDate";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { Select } from "../../origins/select/select.jsx";
import GetSnowRows from "../../components/getSnowRows/getSnowRows";
import CountByDateAndParam from "../../components/getSnowRows/countByDateAndParam";
import GetById from "../../components/getSnowRows/getById";
import "./snow.css";

const SnowPage = () => {
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
    notify_Info("Searching");
    try {
      const onlyId = getCmpValue(id);
      const response = await api.getSnowData(
        dateFrom,
        dateTo,
        onlyId,
        user.token
      );
      if (!response) {
        notify_error("no results");
        return;
      }
      if (response?.resp?.length < 1) {
        response?.resp?.push({ SKIP: false, COUNT: 0 });
      }

      const updatedData = [...data];
      updatedData.unshift({
        date: getCurrentDateAndHour(),
        id: onlyId,
        passed: response.resp[0].PASSED || 0,
        notPassed: response?.resp[0]?.NOT_PASSED || 0,
      });
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAliasSelect = (alias) => {
    const filterd = user?.cmps?.filter((i) => i.cmpUrl.includes(alias));
    if (filterd[0]?.cmpUrl) {
      setId(filterd[0].cmpUrl)
    }
    setIdList(filterd?.map((i) => i?.cmpUrl));
  };

  return (
    <>
      <div className="snowPage-container">
        <form onSubmit={handleSubmit}>
          <Box>
            <h1>Skip information</h1>
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
                <th>ID</th>
                <th>Passed</th>
                <th>Did not pass</th>
              </tr>
            </thead>
          ) : (
            <></>
          )}
          <tbody>
            {data.length > 0 ? (
              data?.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.id}</td>
                  <td className="countFalse">{item.passed}</td>
                  <td className="countTrue">{item.notPassed}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>

      <GetSnowRows />
      {user.role === "topg" ? (
        <>
          <GetById />
          <CountByDateAndParam />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SnowPage;
