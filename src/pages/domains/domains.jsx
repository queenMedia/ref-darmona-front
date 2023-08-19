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

  // injection form
  const [origin_url, set_origin_url] = useState("");
  const [destination_url, set_destination_url] = useState("");
  const [destination_folder, set_destination_folder] = useState("");

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

  const handleInject = async (e) => {
    e.preventDefault();
    if (
      origin_url === "" ||
      !origin_url.includes("https://setish.org/") ||
      destination_url === "" ||
      !destination_url.includes(".com") ||
      destination_folder === ""
    ) {
      notify_error("you mast fill the form preperly");
      return;
    }
    notify_Info("Copy In Progress");
    const waiter = setInterval(() => {
      notify_Info("Copy In Progress");
    }, 5000);

    let linkToInject = "";
    if (origin_url.includes("/index.html")) {
      linkToInject = origin_url.split("/index.html")[0];
    } else {
      linkToInject = origin_url;
    }

    try {
      const resp = await api.inject({
        origin_url: linkToInject,
        destination_url,
        destination_folder,
      });
      console.log(resp);
      clearInterval(waiter);
      notify_success("copy Successful");
    } catch (error) {
      console.log(error.message);
      notify_error("did not copy");
    }
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

      <div className="snowPage-container-sec">
        <h2 className="form-title">Injector</h2>
        <form className="snowPage-form" onSubmit={handleInject}>
          <div className="form-body">
            <input
              onChange={(e) => set_origin_url(e.target.value)}
              type="text"
              placeholder="Insert Link"
              required
            />
            <select
              className="form-select"
              onChange={(e) => set_destination_url(e.target.value)}
              required
            >
              <option value={"Asdf"}>Select Domain</option>
              {user.blackPageDomains.map((i, index) => {
                return (
                  <option key={index} value={i}>
                    {i.split("/")[0]}
                  </option>
                );
              })}
            </select>
            <input
              onChange={(e) =>
                set_destination_folder(e.target.value.replace(/[^a-z]/g, ""))
              }
              value={destination_folder}
              type="text"
              placeholder="Path Name"
              required
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Domains;
