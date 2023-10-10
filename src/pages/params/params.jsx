import React, { useState, useEffect } from "react";
import {
    notify_error,
    notify_success,
    notify_Info,
    handleCopy,
} from "../../utils/notify";
import "./params.css";
import { Select } from "../../origins/select/select.jsx";
import { params } from "../../assets/data/params"

const Params = () => {
    const [platform, setPlatform] = useState("");
    const [selectredParams, setSelectredParams] = useState("");


    const handleSearch = (e) => {
        e.preventDefault();
        const selected = params.filter(i => i.platform === platform)
        setSelectredParams(selected[0].params)
    }

    return (
        <div className="domain-cont">
            <div className="snowPage-container">
                <form className="snowPage-form" onSubmit={handleSearch}>
                    <h2 className="form-title">Platform Params</h2>
                    <div className="form-body">
                        <Select
                            required={true}
                            data={params.map(i => i.platform)}
                            title={"Select Platform"}
                            func={setPlatform}
                        />
                        <button type="submit">Search</button>
                    </div>
                </form>
                <br />
                <div onClick={() => handleCopy(selectredParams)}>
                    {selectredParams}
                </div>
            </div>
        </div >
    );
};

export default Params;
