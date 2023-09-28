import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import {
    notify_error,
    notify_success,
    notify_Info,
    handleCopy,
} from "../../utils/notify";
import "./checkDomAvailability.css";
import { prelandersCharacters } from "../../assets/data/characters";
import { Select } from "../../origins/select";

const CheckDomAvailability = ({ offers }) => {
    const user = useSelector((state) => state.user);
    const [domain, setDomain] = useState("");

    const checkAvailability = async (e) => {
        e.preventDefault();
        console.log(domain);
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
                </div>
            </div>
        </div>
    );
};

export default CheckDomAvailability;
