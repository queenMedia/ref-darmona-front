import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
  notify_error,
  notify_success,
  notify_Info,
  handleCopy,
} from "../../utils/notify";
import "./domains.css";

const Domains = () => {
  const user = useSelector((state) => state.user);
  const [geos, setGeos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedGeo, setGeo] = useState("");
  const [selectedLang, setLang] = useState("");
  const [tableData, setTable] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [offers, setOffers] = useState([]);
  const [defCharachter, setDefCharacter] = useState("mario_dragh");
  const [defOffer, setDefOffer] = useState("immediate_edge");
  const domain = "https://setish.org";
  const notRelavantOffers = ["icons", "characters", "sharing"];

  const getSetishData = async (set, path) => {
    const setishData = await api.getSetishData(path, user.token);
    set(setishData.data);
    return setishData.data;
  };

  const getCharacterData = async (set, path) => {
    const characters = await api.getCharacters(path, user.token);
    console.log(characters);
    set(characters.data);
  };

  const getOfferData = async (set, path) => {
    const offers = await api.getCharacters(path, user.token);
    console.log({ offers });
    set(offers.data);
  };

  const handleSelectGeo = async (geo) => {
    notify_Info("Searching for available languages");
    const resp = await getSetishData(setLanguages, geo);
    setGeo(geo);
    setLang(resp[0]);
    console.log({ resp });
  };

  const handleBpSubmit = async (e) => {
    e.preventDefault();
    if (selectedGeo === "" || selectedLang == "") {
      notify_error("You must select a geo");
      return;
    }

    console.log(selectedLang);
    await getSetishData(setTable, selectedLang);
  };

  const handleLink = (url) => {
    let finaLink = "";
    if (url.split("/")[2].includes("-")) {
      finaLink = `${domain}/${url}`;
    } else {
      finaLink = `${domain}/${url}index.html?character=${defCharachter}&offer=${defOffer}`;
    }
    return finaLink;
  };

  useEffect(() => {
    getSetishData(setGeos, "");
    getCharacterData(setCharacters, "prelanders/characters/");
    getOfferData(setOffers, "prelanders/");
  }, []);

  return (
    <div className="domain-cont">
      <div className="snowPage-container">
        <form className="snowPage-form" onSubmit={handleBpSubmit}>
          <h2 className="form-title">Black Pages</h2>
          <div className="form-body">
            <select
              className="form-select"
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
              onChange={(e) => setLang(e.target.value)}
            >
              <option value={selectedLang}>All Languages</option>

              {languages.map((i, index) => {
                return (
                  <option key={index} value={i}>
                    {i.split("/")[1]}
                  </option>
                );
              })}
            </select>
            <button type="submit">Submit</button>
            <select
              className="form-select"
              onChange={(e) => setDefCharacter(e.target.value)}
            >
              <option value={"Asdf"}>Available Charachters</option>
              {characters.map((i, index) => {
                return (
                  <option
                    key={index}
                    value={i.split("/")[2].replace(".json", " ")}
                  >
                    {i.split("/")[2].replace(".json", " ")}
                  </option>
                );
              })}
            </select>
            <select
              className="form-select"
              onChange={(e) => setDefOffer(e.target.value)}
            >
              <option value={"Asdf"}>Available Offers</option>
              {offers?.map((i, index) => {
                if (notRelavantOffers.includes(i.split("/")[1])) {
                  return null;
                }
                return (
                  <option key={index} value={i.split("/")[1]}>
                    {i.split("/")[1]}
                  </option>
                );
              })}
            </select>
          </div>
        </form>

        <table className="snowPage-table">
          {tableData?.length > 0 ? (
            <>
              <thead>
                <tr>
                  <th>Link</th>
                  <th>Geo</th>
                  <th>Language</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="snowPage-link"
                      onClick={() => handleCopy(handleLink(item))}
                    >
                      {handleLink(item)}
                    </td>
                    <td>{selectedGeo.replace("/", " ")}</td>
                    <td>{selectedLang.split("/")[1]}</td>
                  </tr>
                ))}
              </tbody>{" "}
            </>
          ) : (
            <></>
          )}
        </table>
      </div>
      <div className="snowPage-container">
        <h2 className="form-title">Injector</h2>
        
      </div>
    </div>
  );
};

export default Domains;
