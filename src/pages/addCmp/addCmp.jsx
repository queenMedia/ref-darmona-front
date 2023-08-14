import React, { useState } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateLettersOnly } from "../../utils/validateInput";
import { countryCodes } from "../../assets/data/countryCodes";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { addCmp } from "../../store/slices/user";
import { generateThriveLink } from "../../utils/thrive";
import { SelectWP } from "../../components/selectWP/selectWP";
import "./addCmp.css";
import {
  bing_query,
  bing_query_map,
  fb_query,
  fb_query_map,
  bingLeo_query,
  bingLeo_query_map,
} from "../../assets/data/queryParametrs";

const AddCmp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [thrivePlatform, setThrivePlatform] = useState("");
  const [thriveId, setThriveId] = useState(0);
  const [name, setName] = useState("");
  const [impressions, setImpressions] = useState("");
  const [alias, setAlias] = useState("");
  const [domain, setDomain] = useState("");
  const [geo, setGeo] = useState("AF");
  const [availableAliases, setAvailableAliases] = useState([]);
  const [geoArray, setGeoArray] = useState({
    0: [],
  });
  const [whitePage, setWhitePage] = useState("");
  const [eps, setEps] = useState([
    {
      geo: { grp: [], bl: false },
      weight: 1,
      ep: "",
    },
  ]);
  const [platform, setPlatform] = useState(
    JSON.stringify({ query: bing_query, map: bing_query_map })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let index = 0; index < eps.length; index++) {
      const element = eps[index];
      if (element.geo.grp.length < 1) {
        notify_error("must add geo for each endpoint");
        return;
      }
    }
    const parsedPlatform = JSON.parse(platform);
    console.log("whitepage:", whitePage);
    const data = {
      _id: user._id,
      name,
      imp: { count: Number(impressions), recurring: true },
      ctype: "url",
      query: parsedPlatform.query,
      query_map: parsedPlatform.map,
      alias,
      ip: true,
      track: true,
      dc_ep: whitePage,
      eps: eps,
    };
    console.log(data);
    for (let index = 0; index < eps.length; index++) {
      const element = eps[index];
      console.log(element.geo.grp);
    }
    const apiResp = await api.addCmp(data, user.token);
    if (apiResp?.name && apiResp?.name) {
      notify_success(`Campaign added succesfully`);
      dispatch(
        addCmp({
          name: name,
          url: apiResp.url,
        })
      );
      navigate("/cmplist");
    } else {
      notify_error(apiResp);
    }
  };

  const handleGetAlias = async () => {
    try {
      if (domain) {
        notify_Info(`Searching`);
      } else {
        notify_error("must choose domain first");
        return;
      }
      const resp = await api.getAvailableAliases(user._id, domain, user.token);
      console.log(resp);
      if (resp.length < 1) {
        notify_error("you are out of available aliases");
        return;
      }
      setAvailableAliases(resp);
      notify_success(`${resp.length} aliases are left`);
    } catch (error) {
      console.log(error.message);
      notify_error("choose a different domain");
    }
  };

  const addEps = () => {
    const newEpsObject = {
      geo: { grp: [], bl: false },
      weight: 1,
      ep: "",
    };

    const updatedEps = [...eps];
    updatedEps[eps.length] = newEpsObject;
    setEps(updatedEps);

    setGeoArray((prevGeoArray) => ({
      ...prevGeoArray,
      [eps.length]: [],
    }));
  };

  const updateEp = (index, newEpValue) => {
    const updatedEps = [...eps];
    updatedEps[index].ep = newEpValue;
    setEps(updatedEps);
  };

  const updateGrp = (index) => {
    if (geo) {
      const updatedEps = [...eps];
      updatedEps[index].geo.grp.push(geo);
      setEps(updatedEps);
      const updatedGeoArray = { ...geoArray };
      updatedGeoArray[index].push(geo);
      setGeoArray(updatedGeoArray);
      notify_success("geo added");
    } else {
      notify_error("Must select first");
    }
  };

  const deleteValueFromGeoArray = (key, valueToDelete) => {
    const updatedGeoArray = { ...geoArray };
    updatedGeoArray[key] = updatedGeoArray[key].filter(
      (item) => item !== valueToDelete
    );
    setGeoArray(updatedGeoArray);

    const updatedEps = [...eps];
    updatedEps[key].geo.grp = updatedEps[key].geo.grp.filter(
      (i) => i !== valueToDelete
    );
    setEps(updatedEps);
  };

  const handleThriveLink = (thrivePlatform, thriveId, thriveIdDomain) => {
    if (!thrivePlatform || !thriveId) {
      notify_error("must choose platform and id first");
      return;
    }
    const thriveLink = generateThriveLink(
      thriveIdDomain,
      thrivePlatform,
      thriveId
    );
    console.log(thriveLink);
    navigator.clipboard.writeText(thriveLink);
    notify_success("Copied");
  };

  return (
    <div className="addCmp-container">
      <form className="newCmp-form" onSubmit={handleSubmit} id="cmp">
        <Box>
          <h1>Campaign information</h1>
          <div className="formBody">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Campaign Name"
            />
            <input
              type="number"
              onChange={(e) => setImpressions(e.target.value)}
              value={impressions}
              required
              placeholder="Skip imppressions"
            />
            <div className="geoSelect">
              <select onChange={(e) => setDomain(e.target.value)}>
                <option>Select Domain</option>
                {user.aliases.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <span onClick={() => handleGetAlias()}>Search</span>
            </div>
            <select onChange={(e) => setAlias(e.target.value)}>
              <option>Select Alaias</option>
              {availableAliases.map((i, index) => (
                <option key={index} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </Box>
        <Box>
          <h1>Query Parameters</h1>
          <select
            name="platform"
            id="platform"
            form="cmp"
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option
              value={JSON.stringify({ query: bing_query, map: bing_query_map })}
            >
              Select Platform
            </option>
            <option
              value={JSON.stringify({ query: bing_query, map: bing_query_map })}
            >
              Bing
            </option>
            <option
              value={JSON.stringify({ query: fb_query, map: fb_query_map })}
            >
              Facebook
            </option>
            <option
              value={JSON.stringify({
                query: bingLeo_query,
                map: bingLeo_query_map,
              })}
            >
              Bing(LEO)
            </option>
            {/* <option value={bingLeo_query}>Google</option> */}
          </select>
        </Box>
        <SelectWP setWhitePage={setWhitePage} />
        <Box>
          <h1>Thrive Link</h1>
          <div className="formBody">
            <select onChange={(e) => setThrivePlatform(e.target.value)}>
              <option value={"bing"}>Select Platform</option>
              <option value={"bing"}>Bing</option>
              <option value={"bingLeo"}>BingLeo</option>
              <option value={"facebook"}>Facebook</option>
              <option value={"google"}>Google</option>
            </select>
            <div className="geoSelect">
              <input
                type="number"
                onChange={(e) => setThriveId(e.target.value)}
                placeholder="Thrive Id"
              />
              <span
                onClick={() =>
                  handleThriveLink(thrivePlatform, thriveId, user.thriveId)
                }
              >
                copy
              </span>
            </div>
          </div>
        </Box>
        {eps?.map((item, index) => {
          return (
            <Box key={index}>
              {index === 0 && <h1>Endpoints</h1>}
              <div className="formBody">
                {index === 0 && (
                  <input
                    type="text"
                    onChange={(e) => setWhitePage(encodeURI(e.target.value))}
                    required
                    id="whitePage"
                    placeholder="White Page"
                    value={whitePage}
                  />
                )}

                <input
                  type="text"
                  onChange={(e) => updateEp(index, encodeURI(e.target.value))}
                  required
                  placeholder="Black Page"
                />

                <div className="geoSelect">
                  <select onChange={(e) => setGeo(e.target.value)}>
                    {countryCodes.map((i, index) => (
                      <option key={index} value={i.code}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                  <span onClick={() => updateGrp(index)}>Add</span>
                </div>

                {geoArray[index]?.length > 0 ? (
                  geoArray[index]?.map((i, key) => (
                    <div className="geoSelect" key={key}>
                      <select disabled>
                        <option value={i.code}>{i}</option>
                      </select>
                      <span onClick={() => deleteValueFromGeoArray(index, i)}>
                        X
                      </span>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Box>
          );
        })}
        {/* <span onClick={addEps}>Add Endpoint</span> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCmp;
