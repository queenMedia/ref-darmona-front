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
import { prelandersCharacters } from "../../assets/data/characters";
import BucketTable from "../../components/bucketTable/bucketTable";
import Injector from "../../components/injector/injector";

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
    try {
      const setishData = await api.getSetishData(path, user.token);
      set(setishData.data);
      return setishData.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCharacterData = async (set, path) => {
    const characters = await api.getCharacters(path, user.token);
    console.log(characters);
    set(characters.data);
  };

  const getOfferData = async (set, path) => {
    try {
      const offers = await api.getCharacters(path, user.token);
      set(offers.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSelectGeo = async (geo) => {
    notify_Info("Searching for available languages");
    const resp = await getSetishData(setLanguages, geo);
    setGeo(geo);
    setLang(resp[0]);
    console.log({ geo });

    const updatedCharacters = prelandersCharacters?.filter(
      (i) => i?.geo === geo.split("/")[0]
    );
    setCharacters(updatedCharacters);
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
    console.log({ url });
    let finaLink = "";
    if (url.split("/")[2].includes("-")) {
      finaLink = `${domain}/${url}`;
    } else if (url.includes("https")) {
      finaLink = `${url}?character=${defCharachter}&offer=${defOffer}`;
    } else {
      finaLink = `${domain}/${url}index.html?character=${defCharachter}&offer=${defOffer}`;
    }
    return finaLink;
  };

  useEffect(() => {
    getSetishData(setGeos, "");
    setCharacters(prelandersCharacters);
    getOfferData(setOffers, "prelanders/");
  }, [defCharachter, defOffer]);

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
              <option value={selectedLang}>Select Language</option>

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
              onChange={(e) => setDefCharacter(e.target.value)}
            >
              <option value={"Asdf"}>Select Charachters</option>
              {characters.map((i, index) => {
                return (
                  <option key={index} value={i.keyName}>
                    {i.keyName}
                  </option>
                );
              })}
            </select>
            <select
              className="form-select"
              onChange={(e) => setDefOffer(e.target.value)}
            >
              <option value={"Asdf"}>Select Offer</option>
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
            <button type="submit">Submit</button>
          </div>
        </form>

        <table className="snowPage-table">
          {tableData?.length > 0 ? (
            <>
              <tbody>
                {tableData?.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="snowPage-link"
                      onClick={() => handleCopy(handleLink(item))}
                    >
                      {handleLink(item)}
                    </td>
                    <td>
                      <a
                        className="open"
                        target="_blank"
                        href={handleLink(item).replace(/\s+/g, "")}
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>{" "}
            </>
          ) : (
            <></>
          )}
        </table>
      </div>

      <Injector offers={offers} />
      <BucketTable />
    </div>
  );
};

export default Domains;
