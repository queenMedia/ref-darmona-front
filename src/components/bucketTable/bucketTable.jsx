import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
  notify_error,
  notify_success,
  notify_Info,
  handleCopy,
} from "../../utils/notify";
import "./bucketTable.css";

const BucketTable = () => {
  const user = useSelector((state) => state.user);
  const [domain, setDomain] = useState("");
  const [tableData, setTable] = useState([]);

  const getDomainPages = async (e) => {
    e.preventDefault();
    const domainPages = await api.getSetishData("", user.token, domain);
    setTable(domainPages.data);
  };

  return (
    <div className="domain-cont">
      <div className="snowPage-container">
        <form className="snowPage-form" onSubmit={getDomainPages}>
          <h2 className="form-title">Domain Pages</h2>
          <div className="form-body">
            <select
              className="form-select"
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value={"Asdf"}>Select Domain</option>
              {user.blackPageDomains.map((i, index) => {
                return (
                  <option key={index} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <button type="submit">Submit</button>
          </div>
        </form>

        <table className="snowPage-table">
          {tableData?.length > 0 ? (
            <>
              <tbody>
                {tableData?.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="snowPage-link"
                      onClick={() => handleCopy(`https://${domain}/${item}index.html`)}
                    >
                      https://{domain}/{item}index.html
                    </td>
                    <td>
                      <a
                        className="open"
                        target="_blank"
                        href={`https://${domain}/${item}index.html`}
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};

export default BucketTable;
