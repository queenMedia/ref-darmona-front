import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
  notify_error,
  notify_success,
  notify_Info,
  handleCopy,
} from "../../utils/notify";
import "./injector.css";
import { prelandersCharacters } from "../../assets/data/characters";
import { Select } from "../../origins/select/select.jsx";

const Injector = ({ offers }) => {
  const user = useSelector((state) => state.user);
  const [finaLink, setFinalLink] = useState("");
  const [origin_url, set_origin_url] = useState("");
  const [destination_url, set_destination_url] = useState("");
  const [destination_folder, set_destination_folder] = useState("");

  const [character, setCharacter] = useState("");
  const [offer, setoffer] = useState("");

  const handleInject = async (e) => {
    e.preventDefault();
    if (
      origin_url === "" ||
      !origin_url.includes("https://setish.org/") ||
      destination_url === "" ||
      !destination_url.includes(".com") ||
      destination_folder === ""
    ) {
      notify_error("you must fill the form properly");
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

      if (resp?.data?.message) {
        setFinalLink(`${resp?.data?.message}`);
      }
      clearInterval(waiter);
      notify_success("Inject Successful");
    } catch (error) {
      console.log(error.message);
      notify_error("did not copy");
    }
  };

  const changeFinalLink = () => {
    let newFlink = "";
    if (finaLink.includes("index.html?character=")) {
      const u = new URL(finaLink);
      const q = new URLSearchParams(u.search);
      Object.entries({ character, offer }).forEach(([k, v]) => q.set(k, v));
      u.search = q.toString();
      newFlink = u.toString();
    } else {
      newFlink = `${finaLink}index.html?character=${character}&offer=${offer}`;
    }
    setFinalLink(newFlink);
  };

  return (
    <div className="domain-cont">
      <div className="snowPage-container-sec">
        <h2 className="form-title">Injector</h2>
        <div className="finalLink-container">
          <form className="snowPage-form" onSubmit={handleInject}>
            <div className="form-body">
              <input
                onChange={(e) => set_origin_url(e.target.value)}
                type="text"
                placeholder="Insert Link"
                required
              />
              <Select
                required={true}
                data={user?.blackPageDomains.filter(i => i !== "staging.setish.org")}
                title={"Select Domain"}
                func={set_destination_url}
              />
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
          {finaLink && (
            <>
              <span
                className="finalLink"
                value={finaLink}
                onClick={(e) => handleCopy(finaLink)}
              >
                {finaLink}
              </span>
              <div className="finalLink-selects-res">
                <Select
                  required={true}
                  data={prelandersCharacters.map((i) => i.keyName)}
                  title={"Select Charachter"}
                  func={setCharacter}
                />
                <Select
                  required={true}
                  data={offers.map((i) => i.split("/")[1])}
                  title={"Select Offer"}
                  func={setoffer}
                />
                <span onClick={changeFinalLink}>Add Params</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Injector;
