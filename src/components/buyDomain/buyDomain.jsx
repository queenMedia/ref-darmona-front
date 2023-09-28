import React, { useState, } from "react";
import { api } from "../../utils/api";
import { useSelector, } from "react-redux";
import { notify_Info, notify_error } from "../../utils/notify";
import "./buyDomain.css";

const BuyDomain = () => {
    const user = useSelector((state) => state.user);
    const [domain, setDomain] = useState("");

    const buyDomain = async (e) => {
        e.preventDefault();
        if (domain === "" || !domain.includes(".")) {
            notify_error("domain must include a dot")
            return
        }

    };

    return (
        <div className="domain-cont">
            <div className="snowPage-container-sec">
                <h2 className="form-title">Buy Domain (name.com)</h2>
                <div className="finalLink-container">
                    <form className="snowPage-form" onSubmit={buyDomain}>
                        <div className="form-body">
                            <input
                                onChange={(e) => setDomain(e.target.value)}
                                type="text"
                                placeholder="domain name"
                                required
                            />
                            <button type="submit">Buy</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BuyDomain;
