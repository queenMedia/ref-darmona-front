import React, { useEffect, useState } from "react";
import { Box } from "../box/box";
import { notify_error, notify_Info, handleCopy } from "../../utils/notify";
import { Select } from "../../origins/select/select"
import { api } from "../../utils/api";

export const SelectBP = (props) => {
  const [link, setLink] = useState("");
  const [links, setLinks] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedGeo, setSelectedGeo] = useState("");
  const [selectedCeleb, setSelectedCeleb] = useState("");
  const [geos, setGeos] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [bpgs, setbpgs] = useState([]);

  const types = ["url", "html"];

  const handleTypeSelect = async (type) => {
    try {
      setSelectedType(type)
      const resp = await api.getBPsV2(type, undefined, undefined);
      setbpgs(resp?.data)
      const g = resp.data?.map(i => i.geo)
      var unique = [...new Set(g)]
      setGeos(unique)
      notify_Info(`found ${unique.length} geos`)
    } catch (error) {
      console.log(error.message)
      notify_error("failed")
    }
  }

  const handleGeoSelect = (geo) => {
    try {
      setSelectedGeo(geo)
      const rel = bpgs.filter(i => i.geo === geo);
      const c = rel.map(i => i.celeb)
      var unique = [...new Set(c)]
      setCelebs(unique)

      setSelectedCeleb(unique[0])
      const chosen = bpgs.filter(i => i.celeb === unique[0] && i.geo === geo);
      const l = chosen.map(i => i.productionLink)
      setLinks(l)
      if (l.length === 1) {
        console.log(l.length);
        setLink(l[0])
      }
      return

      setLink("")
      setSelectedCeleb("")
      setLinks([])
      notify_Info(`found ${unique.length} celebs`)
    } catch (error) {
      console.log(error.message)
      notify_error("failed")
    }
  }

  const handleCelebSelect = async (celeb) => {
    try {
      setSelectedCeleb(celeb)
      const chosen = bpgs.filter(i => i.celeb === celeb && i.geo === selectedGeo);
      const l = chosen.map(i => i.productionLink)
      setLinks(l)
      setLink(l[0])
      notify_Info(`found ${l.length} paths`)
    } catch (error) {
      console.log(console.log(error.message));
    }
  }

  useEffect(() => {

  }, [selectedCeleb])

  return (
    <Box>
      <h1>Black Page</h1>
      <div className="formBody">
        <Select
          required={props.required}
          data={types}
          title={"Select Type"}
          func={handleTypeSelect}
        />
        <Select
          required={props.required}
          data={geos}
          title={"Select geo"}
          func={handleGeoSelect}
        />
        <Select
          required={props.required}
          data={celebs}
          title={"Select celeb"}
          func={handleCelebSelect}
        />
        <Select
          required={props.required}
          data={links}
          title={"Select link"}
          func={setLink}
        />
        <input onClick={(e) => handleCopy(link)} value={link} readOnly />
      </div>
    </Box>
  );
};
