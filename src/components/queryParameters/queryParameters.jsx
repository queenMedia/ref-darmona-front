import React from "react";
import { Box } from "../box/box";
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

export const QueryParameters = props => {
  return (
    <Box>
      <h1>Query Parameters</h1>
      <select name="platform" id="platform" form="cmp" onChange={e => props.setPlatform(e.target.value)}>
        <option value={JSON.stringify({ query: bing_query, map: bing_query_map })}>Select Platform</option>
        <option value={JSON.stringify({ query: bing_query, map: bing_query_map })}>Bing</option>
        <option value={JSON.stringify({ query: fb_query, map: fb_query_map })}>Facebook</option>
        <option value={JSON.stringify({ query: bingLeo_query, map: bingLeo_query_map })}>Bing(LEO)</option>
        <option value={JSON.stringify({ query: taboola_query, map: taboola_query_map })}>Taboola</option>
        <option value={JSON.stringify({ query: twitter_query, map: twitter_query_map })}>Twitter</option>
        <option value={JSON.stringify({ query: google_query, map: google_query_map })}>Google</option>
        <option value={JSON.stringify({ query: tiktok_query, map: tiktok_query_map })}>TikTok</option>
      </select>
    </Box>
  );
};
