import React, { useState, useEffect } from "react";
import { notify_success } from "../../utils/notify";
import EditIcon from "../../assets/icons/icon-edit.svg";
import DupIcon from "../../assets/icons/icon-duplicate.jpeg";
import { useNavigate } from "react-router-dom";
import "./table.css";

const Table = ({ data }) => {
  const navigate = useNavigate();
  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    notify_success("Copied");
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Campaign Name</th>
          <th>Link</th>
          <th>Id</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data?.map((item, index) => {
            return (
              <tr key={index}>
                <td onClick={() => handleCopy(item.cmpName)}>{item.cmpName}</td>
                <td onClick={() => handleCopy(`https://${item.domain}`)}>https://{item.domain}</td>
                <td onClick={() => handleCopy(item.cmpId)}>{item.cmpId}</td>
                <td onClick={() => handleCopy(item.status)}>{item.status}</td>
                <td>
                  <img src={EditIcon} alt="" onClick={() => navigate(`/cmplist/editcmp/${encodeURIComponent(item.cmpId)}/${encodeURIComponent(item.cmpName)}/${item.status || "no status"}`)} />
                  {/* <img src={DupIcon} alt="" onClick={() => navigate(`/cmplist/duplicate/${encodeURIComponent(item.cmpId)}/${encodeURIComponent(item.cmpName)}/${item.status || "no status"}`)} /> */}
                </td>
              </tr>
            );
          })
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
};
export default Table;
