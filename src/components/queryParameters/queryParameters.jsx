import React from "react";
import {
  bing_query,
  bing_query_map,
  fb_query,
  fb_query_map,
  bingLeo_query,
  bingLeo_query_map,
  taboola_query,
  taboola_query_map,
  twitter_query,
  twitter_query_map,
  tiktok_query,
  tiktok_query_map,
  google_query,
  google_query_map,
} from "../../assets/data/queryParametrs";
import { ComplexSelect } from "../../origins/select/select";

export const QueryParameters = (props) => {
  const platforms = [
    { code: JSON.stringify({ query: bing_query, map: bing_query_map }), name: "Bing" },
    { code: JSON.stringify({ query: fb_query, map: fb_query_map }), name: "Facebook" },
    { code: JSON.stringify({ query: bingLeo_query, map: bingLeo_query_map }), name: "Bing(LEO)" },
    { code: JSON.stringify({ query: taboola_query, map: taboola_query_map }), name: "Taboola" },
    { code: JSON.stringify({ query: twitter_query, map: twitter_query_map }), name: "Twitter" },
    { code: JSON.stringify({ query: google_query, map: google_query_map }), name: "Google" },
    { code: JSON.stringify({ query: tiktok_query, map: tiktok_query_map }), name: "TikTok" },
  ];

  // Function to handle select change
  const handleSelectChange = (value) => {
    props.setPlatform(value);
    props.setPlatformName(platforms.find(p => p.code === value).name);
  };

  return (
    <ComplexSelect
      title={props.currentPlatform ? props.currentPlatform : "Select Platform"}
      data={platforms}
      func={handleSelectChange}
      required={true}
    />
  );
};
