import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
  notify_error,
  notify_success,
  notify_Info,
  handleCopy,
} from "../../utils/notify";
import "./bucket.css";
// import { prelandersCharacters } from "../../assets/data/characters";
import { Select, GeoSelect, LangSelect } from "../../origins/select";
import {
  affiliateDomains,
  managerDomains,
} from "../../assets/data/commonDomains";

const Bucket = ({ offers }) => {
  const user = useSelector((state) => state.user);
  const [domain, setDomain] = useState("");
  const [geos, setGeos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedGeo, setGeo] = useState("");
  const [selectedLang, setLang] = useState("");
  const [tableData, setTable] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [defCharachter, setDefCharacter] = useState("mario_dragh");
  const [defOffer, setDefOffer] = useState("immediate_edge");

  const handleDomainSelect = async (domainVal) => {
    setDomain(domainVal);
    notify_Info("searching locations");
    await getSetishData(setGeos, "", domainVal);
  };

  const handleGeoSelect = async (geo) => {
    notify_Info("Searching for available languages");
    const resp = await getSetishData(setLanguages, geo, domain);
    const charactersByGeo = await api.getCharactersByGoe(geo.split("/")[0]);
    setGeo(geo);
    setLang(resp[0]);
    console.log(charactersByGeo.data);
    setCharacters(charactersByGeo.data.payload);
  };

  const handleBpSubmit = async (e) => {
    e.preventDefault();
    if (selectedGeo === "" || selectedLang == "") {
      notify_error("You must select and language");
      return;
    }
    await getSetishData(setTable, selectedLang, domain);
  };

  const getSetishData = async (set, path, bucketName) => {
    try {
      const setishData = await api.getSetishData(path, user.token, bucketName);
      set(setishData.data);
      return setishData.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLink = (url) => {
    let finaLink = "";
    if (url.split("/")[2].includes("-")) {
      //old template
      finaLink = `https://${domain}/${url}`;
    } else if (url.includes("https")) {
      // just to add/change params
      finaLink = `https://${url}?character=${defCharachter}&offer=${defOffer}`;
    } else {
      // new template
      finaLink = `https://${domain}/${url}index.html?character=${defCharachter}&offer=${defOffer}`;
    }
    return finaLink.replace(/\s+/g, "");
  };

  return (
    <div className="domain-cont">
      <div className="snowPage-container">
        <form className="snowPage-form" onSubmit={handleBpSubmit}>
          <h2 className="form-title">Black Pages</h2>
          <div className="form-body">
            <Select
              required={true}
              data={
                user?.role === "affiliate" ? affiliateDomains : managerDomains
              }
              title={"Select Domain"}
              func={handleDomainSelect}
            />
            <GeoSelect
              required={true}
              data={geos}
              title={"Select Geo"}
              func={handleGeoSelect}
            />
            <LangSelect
              required={false}
              data={languages}
              title={"Select Language"}
              func={setLang}
            />
            <Select
              required={false}
              data={characters.map((i) => i.keyName)}
              title={"Select Charachters"}
              func={setDefCharacter}
            />
            <Select
              required={false}
              data={offers.map((i) => i.split("/")[1])}
              title={"Select Offer"}
              func={setDefOffer}
            />
            <button type="submit">Submit</button>
          </div>
        </form>

        <table className="snowPage-table">
          {tableData?.length > 0 ? (
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
                    <a className="open" target="_blank" href={handleLink(item)}>
                      Open
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};

export default Bucket;
