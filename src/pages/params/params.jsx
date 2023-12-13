import React from "react";
import { handleCopy } from "../../utils/notify";
import "./params.css";
import { params } from "../../assets/data/params"
import { Input } from "../../origins/input/input";

const Params = () => {
    return (
        <>
            {params.map((i, index) =>
                <div className="params-container" key={index}>
                    <h2>{i.platform}</h2>

                    <Input
                        type={"text"}
                        handleChange={() => { }}
                        param={index}
                        required={false}
                        defValue={i.params}
                        placeholder={"params"}
                        disable={true}
                        width={'100%'}
                        handleClick={() => handleCopy(i.params)}
                    />
                    <label>Params</label>
                    <br /><br />

                    <Input
                        type={"text"}
                        handleChange={() => { }}
                        param={index}
                        required={false}
                        defValue={i.testLink}
                        placeholder={"testLink"}
                        disable={true}
                        width={'100%'}
                        handleClick={() => handleCopy(i.testLink)}
                    />
                    <label>Test Link</label>
                </div>
            )
            }
        </>
    );
};

export default Params;
