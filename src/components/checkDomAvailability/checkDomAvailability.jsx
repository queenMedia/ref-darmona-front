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
        if (domain === "" || !domain.includes(".")) {
            notify_error("domain must include a dot")
            return
        }
        const resp = await api.CheckDomAvailability(domain, user.token)
        if (!resp.data.results[0]?.purchasable) {
            notify_Info("Domain is not available")
            return
        }
        setDomainData(resp.data.results[0])
        console.log(resp.data.results[0]);
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
                    {domainData?.domainName ? (
                        <div className="details-container">
                            <div>
                                <strong>Domain Name:</strong> {domainData.domainName}
                            </div>
                            <div>
                                <strong>Purchasable:</strong> {String(domainData.purchasable)}
                            </div>
                            <div>
                                <strong>Purchase Price:</strong> {domainData.purchasePrice}$
                            </div>
                            <div>
                                <strong>Renewal Price:</strong> {domainData.renewalPrice}$
                            </div>
                        </div>

                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckDomAvailability;
