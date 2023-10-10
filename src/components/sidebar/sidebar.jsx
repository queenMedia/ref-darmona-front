import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Campaigns from "../../assets/icons/cmps.jpeg";
import Snow from "../../assets/icons/snow.svg";
import Domains from "../../assets/icons/domains.svg";
import Params from "../../assets/icons/parameters.svg";
import SideUser from "../../assets/images/sideUser.jpeg";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/user";
export const Sidebar = () => {
  const cmps = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [
    { name: "Campaigns", logo: Campaigns, path: "/cmplist" },
    { name: "Snowflake", logo: Snow, path: "/snow", id: "sideLogo" },
    { name: "Domains", logo: Domains, path: "/domains", id: "sideLogo" },
    { name: "Params", logo: Params, path: "/params", id: "sideLogo" },
  ];

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  const handleLogout = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    deleteAllCookies();
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="sidebar-container">
      {/* <div className="side-user">
        <img src={SideUser} alt="SideUser" />
        <span>{cmps.username}</span>
      </div> */}
      <div className="sidbar-tab-container">
        {items.map((i, index) => {
          return (
            <div
              onClick={() => navigate(i.path)}
              key={index}
              className="sidbar-tab"
            >
              <img id={i?.id || ""} alt="logo" src={i.logo} />
              <span>{i.name}</span>
            </div>
          );
        })}
      </div>
      <span onClick={handleLogout} className="logout">
        Log Out
      </span>
    </div>
  );
};
