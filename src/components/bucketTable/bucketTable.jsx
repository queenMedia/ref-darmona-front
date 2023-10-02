import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
  notify_error,
  notify_success,
  notify_Info,
  handleCopy,
} from "../../utils/notify";
import { Select } from "../../origins/select/select.jsx"
import "./bucketTable.css";


const BucketTable = () => {
  const user = useSelector((state) => state.user);
  const [domain, setDomain] = useState("");
  const [tableData, setTable] = useState([]);

  const getDomainPages = async (e) => {
    e.preventDefault();
    notify_Info("searching")
    const domainPages = await api.getSetishData("", user.token, domain);
    if (!domainPages?.data) {
      notify_error("did not find any pages in this domain");
      return;
    }
    setTable(domainPages?.data);
  };

  return (
    <div className="domain-cont">
      <div className="snowPage-container">
        <form className="snowPage-form" onSubmit={getDomainPages}>
          <h2 className="form-title">Prelander Links</h2>
          <div className="form-body">
            <Select
              required={true}
              data={user.blackPageDomains}
              title={"Select Domain"}
              func={setDomain}
            />
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
                      onClick={() =>
                        handleCopy(`https://${domain}/${item}index.html`)
                      }
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
