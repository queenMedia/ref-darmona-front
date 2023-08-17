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

  return (
    <div className="snowPage-container">
      <form className="form-container">
        <h2 className="form-title">Black Pages</h2>
        <div className="form-body">
          <select
            className="form-select"
            name="platform"
            id="platform"
            form="cmp"
          >
            <option value={"Asdf"}>Select Platform</option>
            <option value={"Asdf"}>Bing</option>
            <option value={"Asdf"}>Facebook</option>
            <option value={"Asdf"}>Bing(LEO)</option>
          </select>
          <select
            className="form-select"
            name="platform"
            id="platform"
            form="cmp"
          >
            <option value={"Asdf"}>Select Platform</option>
            <option value={"Asdf"}>Bing</option>
            <option value={"Asdf"}>Facebook</option>
            <option value={"Asdf"}>Bing(LEO)</option>
          </select>
          <button type="submit">Submit</button>
        </div>
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
