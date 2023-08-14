import React, { useState, useEffect } from "react";
import { notify_success } from "../../utils/notify";
import EditIcon from "../../assets/icons/icon-edit.svg";
import DupIcon from "../../assets/icons/icon-duplicate.jpeg";
import { useNavigate } from "react-router-dom";
import "./table.css";

const Table = ({ data }) => {
  const navigate = useNavigate();
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    notify_success("Copied");
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Campaign Name</th>
          <th>Link</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td onClick={() => handleCopy(item.url)}>{item.url}</td>
                <td>
                  <img
                    src={EditIcon}
                    alt=""
                    onClick={() =>
                      navigate(
                        `/cmplist/editcmp/${encodeURIComponent(
                          item.url
                        )}/${encodeURIComponent(item.name)}`
                      )
                    }
                  />
                  <img src={DupIcon} alt="" />
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
