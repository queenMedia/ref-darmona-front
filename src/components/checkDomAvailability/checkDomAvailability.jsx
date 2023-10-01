import React, { useState, } from "react";
import { api } from "../../utils/api";
import { useSelector, } from "react-redux";
import { notify_Info, notify_error } from "../../utils/notify";
import "./checkDomAvailability.css";

const CheckDomAvailability = () => {
    const user = useSelector((state) => state.user);
    const [domain, setDomain] = useState("");
    const [domainData, setDomainData] = useState({});

    const checkAvailability = async (e) => {
        e.preventDefault();
        if (domain === "") {
            notify_error("domain must include a dot")
            return
        }
        const resp = await api.checkDomAvailability(domain, user.token)
        console.log(resp?.data?.results);
        if (resp?.data?.results?.length < 1) {
            notify_Info("keyword is not available")
            return
        }
        setDomainData(resp.data.results)
    };

    return (
        <div className="domain-cont">
            <div className="snowPage-container-sec">
                <h2 className="form-title">Search Domain (name.com)</h2>
                <div className="finalLink-container">
                    <form className="snowPage-form" onSubmit={checkAvailability}>
                        <div className="form-body">
                            <input
                                onChange={(e) => setDomain(e.target.value)}
                                type="text"
                                placeholder="domain name"
                                required
                            />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <table className="snowPage-table">
                        {domainData?.length > 0 ? (
                            <>
                                <thead>
                                    <tr>
                                        <th>Domain Name</th>
                                        <th>Purchasable</th>
                                        <th>Purchase Price</th>
                                        <th>Renewal Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {domainData?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="snowPage-link">{item.domainName}</td>
                                            <td className="snowPage-link">{String(item.purchasable || false)}</td>
                                            <td className="snowPage-link">{item.purchasePrice || "0"}$</td>
                                            <td className="snowPage-link">{item.renewalPrice || "0"}$</td>
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
        </div>
    );
};

export default CheckDomAvailability;
