import React, { useState } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countryCodes } from "../../assets/data/countryCodes";
import { notify_error, notify_success, notify_Info, handleCopy } from "../../utils/notify";
import { addCmp } from "../../store/slices/user";
import { ThriveLink } from "../../components/thriveLink/thriveLink";
import { Ctype } from "../../components/ctype/ctype";
import { SelectWP } from "../../components/selectWP/selectWP";
import { SelectBP } from "../../components/selectBP/selectBP";
import { bing_query, bing_query_map } from "../../assets/data/queryParametrs";
import { QueryParameters } from "../../components/queryParameters/queryParameters";
import { Select, ComplexSelect } from "../../origins/select/select";
import { Input } from "../../origins/input/input";
import "./addCmp.css";

const AddCmp = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [impressions, setImpressions] = useState("");
  const [alias, setAlias] = useState("");
  const [domain, setDomain] = useState("");
  const [geo, setGeo] = useState("AF");
  const [availableAliases, setAvailableAliases] = useState([]);
  const [whitePage, setWhitePage] = useState("");
  const [whitePageName, setWhitePageName] = useState("");
  const [ctype, setCtype] = useState("url");
  const [platformName, setPlatformName] = useState("");
  const [platform, setPlatform] = useState(JSON.stringify({ query: bing_query, map: bing_query_map }));
  const [eps, setEps] = useState([
    {
      geo: { grp: [], bl: false },
      weight: 1,
      ep: "",
      epName: ""
    },
  ]);

  const handleSubmit = async e => {
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
      dc_ep_name: whitePageName,
      platformName: platformName,
      eps: eps,
    };
    const apiResp = await api.addCmp(data, user.token);
    if (apiResp?.cmpName) {
      notify_success(`Campaign added succesfully`);
      dispatch(addCmp(apiResp));
      navigate("/cmplist");
    } else {
      notify_error(apiResp || "Contact Developers");
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
      if (!resp || resp.length < 1) {
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

  const handleCopyAndSet = (i) => {
    handleCopy(i)
    setAlias(i)
  };
  //update black page by index
  const updateEp = (index, newEpValue) => {
    const updatedEps = [...eps];
    updatedEps[index].ep = newEpValue;
    setEps(updatedEps);
  };
  //update black page name by index
  const updateEpName = (index, newEpNameValue) => {
    const updatedEps = [...eps];
    updatedEps[index].epName = newEpNameValue;
    setEps(updatedEps);
  };
  //update weight page by index
  const updateWeight = (index, newEpValue) => {
    const updatedEps = [...eps];
    updatedEps[index].weight = Number(newEpValue);
    setEps(updatedEps);
  };
  //add geos by index
  const addGrp = index => {
    if (geo) {
      const updatedEps = [...eps];
      updatedEps[index].geo.grp.push(geo);
      setEps(updatedEps);
      notify_success("geo added");
    } else {
      notify_error("Must select first");
    }
  };
  //delete geo by index
  const deleteGrp = (index, geoToDelete) => {
    const updatedEps = [...eps];
    updatedEps[index].geo.grp = updatedEps[index].geo.grp.filter(i => i !== geoToDelete);
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

  const deleteEps = index => {
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
            <Input
              type={"text"}
              handleChange={setName}
              defValue={name}
              required={true}
              placeholder={"Campaign Name"}
            />
            <Input
              type={"number"}
              handleChange={setImpressions}
              defValue={impressions}
              required={true}
              placeholder={"Skip imppressions"}
            />
            <div className="selectWithBtn">
              <Select
                required={true}
                data={user.aliases}
                customOption={"*"}
                customOptionText={"Find availabel root Domain"}
                title={"Select Domain"}
                func={setDomain}
              />
              <span onClick={() => handleGetAlias()}>Search</span>
            </div>
            <Select
              required={true}
              data={availableAliases}
              title={"Select Alaias"}
              func={handleCopyAndSet}
            />
          <QueryParameters setPlatform={setPlatform} setPlatformName={setPlatformName} />
          </div>
          {/* <Ctype setType={setCtype} /> */}
        </Box>
        {ctype !== "tag" && (
          <>
            <ThriveLink />
            <SelectWP setWhitePage={setWhitePage} required={true} />
            <SelectBP required={true} />
          </>
        )}
        {eps?.map((item, index) => {
          return (
            <Box key={index}>
              {index === 0 && <h1>Endpoints</h1>}
              <div className="formBody">
                {index === 0 &&
                  <>
                    <Input
                      type={"text"}
                      defValue={whitePage}
                      handleChange={setWhitePage}
                      required={true}
                      placeholder={"WP Path"}
                    />
                    <Input
                      type={"text"}
                      defValue={whitePageName}
                      handleChange={setWhitePageName}
                      required={true}
                      placeholder={"WP Name"}
                    /></>}
                <Input
                  type={"text"}
                  handleChange={updateEp}
                  param={index}
                  required={true}
                  defValue={eps[index]?.ep}
                  placeholder={"BP Path"}
                />
                <Input
                  type={"text"}
                  handleChange={updateEpName}
                  param={index}
                  required={true}
                  defValue={eps[index]?.epName}
                  placeholder={"BP Name"}
                />
                <Input
                  type={"number"}
                  handleChange={updateWeight}
                  param={index}
                  required={true}
                  defValue={eps[index]?.weight}
                  placeholder={"Weight"}
                />
                <div className="selectWithBtn">
                  <ComplexSelect
                    required={true}
                    data={countryCodes}
                    title={"Select Geo"}
                    func={setGeo}
                  />
                  <span onClick={() => addGrp(index)}>Add</span>
                </div>

                {item.geo.grp?.map((i, key) => (
                  <div className="selectWithBtn" key={key}>
                    <select disabled>
                      <option value={i.code}>{i}</option>
                    </select>
                    <span onClick={() => deleteGrp(index, i)}>X</span>
                  </div>
                ))}
                {index === 0 ? <span onClick={addEps}>Add Endpoint</span> : <span onClick={() => deleteEps(index)}>Delete Endpoint</span>}
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
