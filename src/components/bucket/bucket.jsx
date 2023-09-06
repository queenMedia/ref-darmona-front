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
import { Select } from "../../origins/select";

const Bucket = ({ offers }) => {
  const user = useSelector((state) => state.user);

  const versions = ["new", "old"];
  const domains = ["setish.org", "staging.setish.org"];
  const [geos, setGeos] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [tableData, setTable] = useState([]);

  const [selectedDomain, setDomain] = useState("");
  const [selectedVersion, setVersion] = useState("");
  const [selectedGeo, setGeo] = useState("");
  const [selectedCharachter, setCharacter] = useState("");

  const handleVersionSelect = async (versionVal) => {
    setVersion(versionVal);
    notify_Info("searching Geos");
    try {
      const resp = await api.getGeobyVersionV2(versionVal);
      console.log(resp);
      setGeos(resp.data);
      setCharacters([])
      setTable([])
      setCharacter("")
      setGeo("")
    } catch (error) {
      console.log(error);
      notify_error("Failed");
    }
  };

  const handleGeoSelect = async (geoVal) => {
    notify_Info("Searching for available Characters");
    const charactersByGeo = await api.getCharactersByGeoV2(
      selectedVersion,
      geoVal
    );
    setGeo(geoVal);
    setCharacter(charactersByGeo.data[0]);
    setCharacters(charactersByGeo.data);
  };

  const handleBpSubmit = async (e) => {
    e.preventDefault();
    if (
      selectedGeo === "" ||
      selectedCharachter === "" ||
      selectedVersion === ""
    ) {
      notify_error("You must select all fields");
      return;
    }
    const resp = await api.getBPsV2(
      selectedVersion,
      selectedGeo,
      selectedCharachter
    );
    setTable(resp.data);
  };

  return (
    <div className="domain-cont">
      <div className="snowPage-container">
        <form className="snowPage-form" onSubmit={handleBpSubmit}>
          <h2 className="form-title">Black Pages</h2>
          <div className="form-body">
            <Select
              required={true}
              data={domains}
              title={"Select Domain"}
              func={setDomain}
            />
            <Select
              required={true}
              data={versions}
              title={"Select Version"}
              func={handleVersionSelect}
            />
            <Select
              required={true}
              data={geos}
              title={"Select Geo"}
              func={handleGeoSelect}
            />
            <Select
              required={true}
              data={characters}
              title={"Select Character"}
              func={setCharacter}
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
                    onClick={() => handleCopy(item.stagingLink)}
                  >
                    {selectedDomain === "staging.setish.org"
                      ? item.stagingLink
                      : item.productionLink}
                  </td>
                  <td className="snowPage-link">{item.lang}</td>
                  <td className="snowPage-link">{item.template}</td>
                  <td className="snowPage-link">{item.offerPage}</td>
                  <td>
                    <a
                      className="open"
                      target="_blank"
                      href={
                        selectedDomain === "staging.setish.org"
                          ? item.stagingLink
                          : item.productionLink
                      }
                    >
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
