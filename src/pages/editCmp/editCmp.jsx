import React, { useState, useEffect } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { countryCodes } from "../../assets/data/countryCodes";
import { notify_error, notify_success } from "../../utils/notify";
import "./editCmp.css";

const EditCmp = () => {
  const user = useSelector(state => state.user);
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

  const handleGetJson = async id => {
    const json = await api.getCmp(id, user.token);
    console.log(json);
    if (json === "file not found" || json?.error?.includes("Unauthorized")) {
      notify_error("file not found");
      navigate("/cmplist");
      return;
    }
    setAlias(json?.alias);
    setImpressions(json?.imp?.count);
    setWhitePage(json?.dc_ep);
    setEps(json?.eps);
  };

  useEffect(() => {
    setName(cmpName);
    handleGetJson(id);
  }, []);

  const handleSubmit = async e => {
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
      notify_error(apiResp || "Failed to Edit");
    }
  };
  const updateEp = (index, newEpValue) => {
    const updatedEps = [...eps];
    updatedEps[index].ep = newEpValue;
    setEps(updatedEps);
  };
  const updateGrp = index => {
    if (geo) {
      const updatedEps = [...eps];
      updatedEps[index].geo.grp.push(geo);
      setEps(updatedEps);
      notify_success("geo added");
    } else {
      notify_error("Must select first");
    }
  };
  const deleteGrp = (key, valueToDelete) => {
    const updatedEps = [...eps];
    updatedEps[key].geo.grp = updatedEps[key].geo.grp.filter(i => i !== valueToDelete);
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
          <h1>Edit information</h1>
          <div className="edit-formBody">
            <div>
              <input type="text" id="name" onChange={e => setName(e.target.value)} value={name} required placeholder="Name" />
              <label htmlFor="name">Campaign Name</label>
            </div>
            <div>
              <input type="number" id="impressions" onChange={e => setImpressions(e.target.value)} value={impressions} required placeholder="Skip impressions" />
              <label htmlFor="impressions">Skip Impressions</label>
            </div>
            <div>
              <input type="text" id="alias" value={alias} required placeholder="Alias" disabled={true} />
              <label htmlFor="alias">Alias(disabled)</label>
            </div>
            <div>
              <input type="text" id="whitePage" onChange={e => setWhitePage(e.target.value)} value={whitePage} required placeholder="White Page" />
              <label htmlFor="whitePage">White Page</label>
            </div>
          </div>
        </Box>
        {eps?.map((item, index) => {
          return (
            <Box key={index}>
              {index === 0 && <h1>Endpoints</h1>}
              <div className="edit-formBody">
                <div className="edit-blackPage">
                  <input id="blackPage" type="text" onChange={e => updateEp(index, encodeURI(e.target.value))} value={decodeURI(item.ep)} required placeholder="Black Page" />
                  <label htmlFor="blackPage">Black Page</label>
                </div>
                <div className="geoSelect">
                  <select onChange={e => setGeo(e.target.value)} className="geoSelect-text">
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
                      <span onClick={() => deleteGrp(index, i)}>X</span>
                    </div>
                  ))
                ) : (
                  <></>
                )}
                {index === 0 ? <span onClick={addEps}>Add Endpoint</span> : <span onClick={() => deleteEps(index)}>Delete Endpoint</span>}
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
