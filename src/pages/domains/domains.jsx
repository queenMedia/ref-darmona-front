import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import "./domains.css";

const Domains = () => {
  const user = useSelector((state) => state.user);

  const [geos, setGeos] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [selectedGeo, setGeo] = useState("");
  const [selectedLang, setLang] = useState("");

  const [tableData, setTable] = useState([]);

  const getSetishData = async (set, path) => {
    const setishData = await api.getSetishData(path, user.token);
    set(setishData.data);
  };

  useEffect(() => {
    getSetishData(setGeos, "");
  }, []);

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
            onChange={(e) => setGeo(e.target.value)}
          >
            <option value={"Asdf"}>Select Geo</option>
            {geos.map((i, index) => {
              return (
                <option key={index} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
          <select
            className="form-select"
            name="platform"
            id="platform"
            form="cmp"
          >
            <option value={"Asdf"}>Select Language</option>
            {languages.map((i, index) => {
              return (
                <option key={index} value={i}>
                  {i}
                </option>
              );
            })}
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
          {tableData.length > 0 ? (
            tableData?.map((item, index) => (
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
