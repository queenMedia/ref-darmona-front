import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "../../components/table/table";
import "./cmpList.css";

const CmpList = () => {
  const allCmps = useSelector((state) => state.user.cmps);
  const [search, setSearch] = useState("");
  const [cmps, setCmps] = useState(useSelector((state) => state.user.cmps));
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleSearch = () => {
    if (search) {
      const filterd = allCmps.filter((i) => {
        if (i.cmpName.toLowerCase().includes(String(search).toLowerCase())) {
          return true;
        }
      });
      setCmps(filterd);
    } else {
      setCmps(allCmps);
    }
  };

  return (
    <div className="cmp-list-container">
      <div className="cmp-search-container">
        <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
        {/* <button onClick={handleSearch}>Search</button> */}
        <button onClick={() => navigate("/cmplist/addnew")}>Add Cmp</button>
      </div>
      <Table data={cmps} />
    </div>
  );
};

export default CmpList;
