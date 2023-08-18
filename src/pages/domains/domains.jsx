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
  const [characters, setCharacters] = useState([]);

  const getSetishData = async (set, path) => {
    const setishData = await api.getSetishData(path, user.token);
    set(setishData.data);
  };
  const getCharacterData = async (set, path) => {
    const characters = await api.getCharacters(path, user.token);
    set(characters.data);
  };

  const handleSelectGeo = async (geo) => {
    notify_Info("Searching for available languages");
    setGeo(geo);
    const resp = await getSetishData(setLanguages, geo);
    console.log(resp);
  };

  const handleBpSubmit = async () =>{
    
  }

  useEffect(() => {
    getSetishData(setGeos, "");
    getCharacterData(setCharacters, "prelanders/characters/");
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
            onChange={(e) => handleSelectGeo(e.target.value)}
          >
            <option value={"Asdf"}>Select Geo</option>
            {geos.map((i, index) => {
              return (
                <option key={index} value={i}>
                  {i.split("/")[0]}
                </option>
              );
            })}
          </select>
          <select
            className="form-select"
            name="platform"
            id="platform"
            form="cmp"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value={"Asdf"}>All Languages</option>
            {languages.map((i, index) => {
              return (
                <option key={index} value={i}>
                  {i.split("/")[1]}
                </option>
              );
            })}
          </select>
          <select
            className="form-select"
            name="platform"
            id="platform"
            form="cmp"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value={"Asdf"}>All Charachters</option>
            {characters.map((i, index) => {
              return (
                <option key={index} value={i}>
                  {i.split("/")[2].replace("_", " ").replace(".json", " ")}
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
            <th>Link</th>
            <th>Geo</th>
            <th>Language</th>
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
