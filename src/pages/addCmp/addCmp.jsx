import React, { useState } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countryCodes } from "../../assets/data/countryCodes";
import { notify_error, notify_success, notify_Info } from "../../utils/notify";
import { addCmp } from "../../store/slices/user";
import { ThriveLink } from "../../components/thriveLink/thriveLink";
import { Ctype } from "../../components/ctype/ctype";
import { SelectWP } from "../../components/selectWP/selectWP";
import { bing_query, bing_query_map } from "../../assets/data/queryParametrs";
import { QueryParameters } from "../../components/queryParameters/queryParameters";
import "./addCmp.css";

const AddCmp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [impressions, setImpressions] = useState("");
  const [alias, setAlias] = useState("");
  const [domain, setDomain] = useState("");
  const [geo, setGeo] = useState("AF");
  const [availableAliases, setAvailableAliases] = useState([]);
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
    console.log({ data });
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

  //update black page by index
  const updateEp = (index, newEpValue) => {
    const updatedEps = [...eps];
    updatedEps[index].ep = newEpValue;
    setEps(updatedEps);
  };
  //add geos by index
  const addGrp = (index) => {
    if (geo) {
      const updatedEps = [...eps];
      updatedEps[index].geo.grp.push(geo);
      setEps(updatedEps);
      notify_success("geo added");
    } else {
      notify_error("Must select first");
    }
  };
  //delete geos by index
  const deleteGrp = (key, valueToDelete) => {
    const updatedEps = [...eps];
    updatedEps[key].geo.grp = updatedEps[key].geo.grp.filter(
      (i) => i !== valueToDelete
    );
    setEps(updatedEps);
    notify_success(`deleted`);
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
  };
  const deleteEps = (index) => {
    const updatedEps = [...eps];
    updatedEps.splice(index, 1);
    setEps(updatedEps);
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
        <Ctype />
        <QueryParameters setPlatform={setPlatform} />
        <SelectWP setWhitePage={setWhitePage} />
        <ThriveLink />

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
                  <span onClick={() => addGrp(index)}>Add</span>
                </div>

                {item.geo.grp?.length > 0 ? (
                  item.geo.grp?.map((i, key) => (
                    <div className="geoSelect" key={key}>
                      <select disabled>
                        <option value={i.code}>{i}</option>
                      </select>
                      <span onClick={() => deleteGrp(index, i)}>X</span>
                    </div>
                  ))
                ) : (
                  <></>
                )}
                {index === 0 ? (
                  <span onClick={addEps}>Add Endpoint</span>
                ) : (
                  <span onClick={() => deleteEps(index)}>Delete Endpoint</span>
                )}
              </div>
            </Box>
          );
        })}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCmp;
