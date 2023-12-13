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
        <>
            {params.map((i, index) =>
                <div className="params-container" key={index}>
                    <h2>{i.platform}</h2>
                    <b> <u> Params:</u></b> <p onClick={() => handleCopy(i.params)}>{i.params}</p>
                    <b> <u>Test Link:</u></b><p onClick={() => handleCopy(i.testLink)}>{i.testLink}</p>
                </div>
            )
            }
        </>
    );
};

export default Params;
