import React, { useState, useEffect } from "react";
import { notify_success, notify_error } from "../../utils/notify";
import EditIcon from "../../assets/icons/icon-edit.svg";
import DupIcon from "../../assets/icons/icon-duplicate.jpeg";
import { useNavigate } from "react-router-dom";
import { cmpStatusOption } from "../../assets/data/commonDomains";
import { useSelector } from "react-redux";
import { api } from "../../utils/api";
import { SelectWithFuncParam } from "../../origins/select/select";
import "./table.css";

const Table = ({ data }) => {
  const user = useSelector(state => state.user);

  const navigate = useNavigate();
  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    notify_success("Copied");
  };

  const handleStatusChange = async (cmpDocId, status) => {
    try {
      const data = {
        cmpDocId,
        status,
      };
      const resp = await api.updateCmpDoc(data, user.token);
      if (resp.data === "Updated") {
        notify_success("Updated");
      } else {
        notify_error("Error");
      }
    } catch (error) {
      notify_error("Error");
      console.log(error.message);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
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
                <td onClick={() => handleCopy(item.cmpName)}>{String(item.createdAt)?.split("T")[0]}</td>
                <td onClick={() => handleCopy(item.cmpName)}>{item.cmpName}</td>
                <td onClick={() => handleCopy(`https://${item.domain}`)}>https://{item.domain}</td>
                <td onClick={() => handleCopy(item.cmpId)}>{item.cmpId?.slice(0, 15) + '...' + item.cmpId?.slice(-4)}</td>
                <td>
                  <SelectWithFuncParam
                    className={item.status.replace(" ", "")}
                    required={true}
                    data={cmpStatusOption}
                    title={item.status}
                    func={handleStatusChange}
                    funcParam={item._id}
                  />
                </td>
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
