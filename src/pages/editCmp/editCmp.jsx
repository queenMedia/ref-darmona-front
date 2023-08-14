import React, { useState, useEffect } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { countryCodes } from "../../assets/data/countryCodes";
import { notify_error, notify_success } from "../../utils/notify";
import "./editCmp.css";

const EditCmp = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [impressions, setImpressions] = useState(1);
  const [alias, setAlias] = useState("");
  const [geo, setGeo] = useState("");
  const [whitePage, setWhitePage] = useState("");
  const { id, cmpName } = useParams();
  const [eps, setEps] = useState([
    {
      geo: { grp: [], bl: false },
      weight: 1,
      ep: "",
    },
  ]);

  const handleGetJson = async (cmpValue) => {
    const json = await api.getCmp(cmpValue, user.token);
    if (json === "file not found" || !json) {
      notify_error("file not found");
      navigate("/cmplist");
      return;
    }
    setAlias(json.alias);
    setImpressions(json.imp.count);
    setWhitePage(json.dc_ep);
    setEps(json.eps);
  };

  useEffect(() => {
    setName(cmpName);
    const url = new URL(id);
    const cmpValue = url.searchParams.get("cmp");
    handleGetJson(cmpValue);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let index = 0; index < eps.length; index++) {
      const element = eps[index];
      if (element.geo.grp.length < 1) {
        notify_error("must add geo for each endpoint");
        return;
      }
    }
    const data = {
      _id: user._id,
      url: decodeURI(id),
      name,
      imp: { count: Number(impressions), recurring: true },
      alias,
      dc_ep: encodeURI(whitePage),
      eps: eps,
    };
    for (let index = 0; index < data.eps.length; index++) {
      const element = data.eps[index];
      console.log(element.geo.grp);
    }
    console.log({ data });
    const apiResp = await api.updateCmp(data, user.token);
    if (apiResp === 200) {
      notify_success(`Campaign updated succesfully`);
      navigate("/cmplist");
    } else {
      notify_error(apiResp);
    }
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
      notify_success("geo added");
    } else {
      notify_error("Must select first");
    }
  };
  const deleteValueFromGeoArray = (key, valueToDelete) => {
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
              placeholder="Name"
            />
            <input
              type="number"
              onChange={(e) => setImpressions(e.target.value)}
              value={impressions}
              required
              placeholder="Skip imppressions"
            />
            <input
              type="text"
              value={alias}
              required
              placeholder="Alias"
              disabled={true}
            />
            <input
              type="text"
              onChange={(e) => setWhitePage(e.target.value)}
              value={whitePage}
              required
              id="whitePage"
              placeholder="White Page"
            />
          </div>
        </Box>
        {eps?.map((item, index) => {
          return (
            <Box key={index}>
              {index === 0 && <h1>Endpoints</h1>}
              <div className="formBody">
                <input
                  type="text"
                  onChange={(e) => updateEp(index, encodeURI(e.target.value))}
                  value={decodeURI(item.ep)}
                  required
                  placeholder="Black Page"
                />
                <div className="geoSelect">
                  <select
                    onChange={(e) => setGeo(e.target.value)}
                    className="geoSelect-text"
                  >
                    {countryCodes.map((i, index) => (
                      <option key={index} value={i.code}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                  <span onClick={() => updateGrp(index)}>Add</span>
                </div>

                {item.geo.grp?.length > 0 ? (
                  item.geo.grp?.map((i, key) => (
                    <div className="geoSelect" key={key}>
                      <select disabled>
                        <option value={i}>{i}</option>
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

export default EditCmp;
