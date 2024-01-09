import React, { useState } from "react";
import { notify_error, notify_success } from "../../utils/notify";
import { generateThriveLink } from "../../utils/thrive";
import { useSelector } from "react-redux";
import { Box } from "../box/box";

export const ThriveLink = () => {
  const user = useSelector((state) => state.user);
  const [thrivePlatform, setThrivePlatform] = useState("");
  const [thriveId, setThriveId] = useState(0);

  const handleThriveLink = (thrivePlatform, thriveId, thriveIdDomain) => {
    if (!thrivePlatform || !thriveId) {
      notify_error("must choose platform and id first");
      return;
    }
    const thriveLink = generateThriveLink(
      thriveIdDomain,
      thrivePlatform,
      thriveId
    );
    navigator.clipboard.writeText(thriveLink);
    notify_success("Copied");
  };

  return (
    <Box>
      <h1>Thrive Link / BP Path</h1>
      <div className="formBody">
        <select onChange={(e) => setThrivePlatform(e.target.value)}>
          <option value={"bing"}>Select Platform</option>
          <option value={"bing"}>Bing</option>
          <option value={"facebook"}>Facebook</option>
          <option value={"google"}>Google</option>
          <option value={"taboola"}>Taboola</option>
          <option value={"twitter"}>Twitter</option>
          <option value={"tiktok"}>Tiktok</option>
        </select>
        <div className="geoSelect">
          <input
            type="number"
            onChange={(e) => setThriveId(e.target.value)}
            placeholder="Thrive Id"
          />
          <span
            onClick={() =>
              handleThriveLink(thrivePlatform, thriveId, user.thriveId)
            }
          >
            copy
          </span>
        </div>
      </div>
    </Box>
  );
};
