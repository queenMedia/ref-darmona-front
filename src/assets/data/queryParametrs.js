export const bing_query = {
  matchtype: { type: "pattern", cmp: "^[a-zA-z]{1,3}$" },
  adid: { type: "pattern", cmp: "^[0-9]+$" },
  network: { type: "pattern", cmp: "^[a-zA-z]{1,3}$" },
  keyword: { type: "pattern", cmp: "^[0-9a-zA-z_ ]+$" },
  campaignid: { type: "pattern", cmp: "^[0-9]+$" },
  targetid: { type: "pattern", cmp: "^[0-9a-zA-z-:]+$" },
  device: { type: "pattern", cmp: "^[0-9a-zA-z]+$" },
  msclkid: { type: "pattern", cmp: "^[0-9a-zA-z]+$" },
};
export const bing_query_map = {
  sub1: "matchtype",
  sub2: "adid",
  sub3: "network",
  sub4: "keyword",
  sub5: "campaignid",
  sub6: "targetid",
  sub7: "device",
  sub8: "msclkid",
};
export const fb_query = {
  site_source_name: { type: "pattern", cmp: "^[a-z]+$" },
  adset_name: { type: "pattern", cmp: "^[a-zA-Z0-9]+$" },
  campaign_id: { type: "pattern", cmp: "^[0-9]+$" },
  ad_id: { type: "pattern", cmp: "^[0-9]+$" },
  campaign_name: { type: "pattern", cmp: "^[a-zA-Z0-9 ]+$" },
  placement: { type: "pattern", cmp: "^[a-zA-Z0-9_]+$" },
  ad_name: { type: "pattern", cmp: "^[a-zA-Z0-9-]+$" },
  adset_id: { type: "pattern", cmp: "^[0-9]+$" },
};
export const fb_query_map = {
  sub1: "site_source_name",
  sub2: "adset_name",
  sub3: "campaign_id",
  sub4: "ad_id",
  sub5: "campaign_name",
  sub6: "placement",
  sub7: "ad_name",
  sub8: "adset_id",
};
export const bingLeo_query = {
  aff_sub8: { type: "pattern", cmp: "^[a-zA-z]{1,3}$" },
  aff_sub1: { type: "pattern", cmp: "^[0-9]+$" },
  msclkid: { type: "pattern", cmp: "^[0-9a-zA-z]+$" },
  aff_sub2: { type: "pattern", cmp: "^[0-9]+$" },
  aff_sub12: { type: "pattern", cmp: "^[0-9a-zA-z]+$" },
  aff_sub9: { type: "pattern", cmp: "^[a-zA-z]{1,3}$" },
  aff_sub10: { type: "pattern", cmp: "^[a-zA-z]{1,3}$" },
};
export const bingLeo_query_map = {
  sub1: "aff_sub8",
  sub2: "aff_sub1",
  sub3: "msclkid",
  sub4: "aff_sub2",
  sub5: "aff_sub12",
  sub6: "aff_sub9",
  sub8: "aff_sub10",
};

export const google_query = {
  aff_sub1: { type: "pattern", cmp: "^[0-9]{9,}$" },
  aff_sub2: { type: "pattern", cmp: "^[0-9]{10,}$" },
  aff_sub7: { type: "pattern", cmp: "^[0-9]{4,}$" },
  aff_sub10: { type: "pattern", cmp: "^[a-z]$" },
  aff_sub13: { type: "pattern", cmp: "^[0-9]{10,}$" },
};
export const google_query_map = {
  sub1: "aff_sub1",
  sub2: "aff_sub2",
  sub3: "aff_sub3",
  sub4: "aff_sub4",
  sub5: "aff_sub5",
  sub6: "aff_sub6",
  sub7: "aff_sub7",
  sub8: "aff_sub8",
  sub9: "aff_sub9",
  sub10: "aff_sub10",
  sub11: "aff_sub11",
  sub12: "aff_sub12",
  sub13: "aff_sub13",
  sub14: "aff_sub14",
  sub15: "aff_sub15",
  sub16: "aff_sub16",
};

export const taboola_query = {
  aff_sub2: { type: "pattern", cmp: "^[0-9]+$" },
  aff_sub3: { type: "pattern", cmp: "^[0-9a-zA-z\\-.]+$" },
  aff_sub6: { type: "pattern", cmp: "^[a-zA-z]+$" },
  aff_sub7: { type: "pattern", cmp: "^[0-9]+$" },
  aff_sub8: { type: "pattern", cmp: "^[0-9a-zA-z_\\-+]+$" },
  aff_sub9: { type: "pattern", cmp: "^[0-9]+$" },
  aff_sub11: { type: "pattern", cmp: "^[0-9a-zA-z_\\-]+$" },
};
export const taboola_query_map = {
  sub1: "aff_sub",
  sub2: "aff_sub2",
  sub3: "aff_sub3",
  sub4: "aff_sub4",
  sub5: "aff_sub5",
  sub6: "aff_sub6",
  sub7: "aff_sub7",
  sub8: "aff_sub8",
  sub9: "aff_sub9",
  sub10: "aff_sub10",
  sub11: "aff_sub11",
};

export const twitter_query = {};

export const twitter_query_map = {};

export const tiktok_query = {};

export const tiktok_query_map = {};
