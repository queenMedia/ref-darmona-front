import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector } from "react-redux";
import BucketTable from "../../components/bucketTable/bucketTable";
import Injector from "../../components/injector/injector";
import Bucket from "../../components/bucket/bucket";
import "./domains.css";

const Domains = () => {
  const user = useSelector((state) => state.user);
  const [offers, setOffers] = useState([]);
  const filterResp = ["icons", "characters", "sharing"];

  const getOfferData = async (set, path) => {
    try {
      const offers = await api.getCharacters(path, user.token);
      const filterd = offers.data.filter(
        (i) => !filterResp.includes(i.split("/")[1])
      );
      set(filterd);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOfferData(setOffers, "prelanders/");
  }, []);

  return (
    <div className="domain-cont">
      <Bucket offers={offers} />
      <Injector offers={offers} />
      <BucketTable />
    </div>
  );
};
export default Domains;
