import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const Domains = () => {
  const cmps = useSelector((state) => state.user.cmps);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/cmplist/addnew")}>here</button>
      {/* {cmps &&
        cmps?.map((i, key) => (
          <div key={key}>
            <p>{i.name}</p>
            <p>{i.url}</p>
          </div>
        ))} */}
    </div>
  );
};

export default Domains;
