import React, { useEffect, useState } from "react";
import Campaigns from "../../assets/icons/cmps.jpeg";
import Domains from "../../assets/icons/domains.jpeg";
import "./header.css";
const Header = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    switch (true) {
      case path === "/cmplist":
        setTitle("Campaigns");
        setImage(Campaigns);
        break;
      case path === "/domains":
        setTitle("Domains");
        setImage(Domains);
        break;

      default:
        break;
    }
  }, []);
  return (
    <div className="header-container">
      <img src={image} />
      <span>{title}</span>
    </div>
  );
};

export default Header;
