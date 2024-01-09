export const generateThriveLink = (domain, platform, id) => {
  let link = "";
  switch (true) {
    case platform === "facebook":
      link = `https://${domain}/click?trvid=${id}&ad_id={{AD_ID}}&adset_id={{ADSET_ID}}&campaign_id={{CAMPAIGN_ID}}&ad_name={{AD_NAME}}&adset_name={{ADSET_NAME}}&campaign_name={{CAMPAIGN_NAME}}&placement={{PLACEMENT}}&site_source_name={{SITE_SOURCE_NAME}}`;
      break;
    case platform === "google":
      link = `https://${domain}/click?trvid=${id}&aff_sub1={{AFF_SUB1}}&aff_sub2={{AFF_SUB2}}&aff_sub3={{AFF_SUB3}}&aff_sub4={{AFF_SUB4}}&aff_sub5={{AFF_SUB5}}&aff_sub6={{AFF_SUB6}}&aff_sub7={{AFF_SUB7}}&aff_sub8={{AFF_SUB8}}&aff_sub9={{AFF_SUB9}}&aff_sub10={{AFF_SUB10}}&aff_sub11={{AFF_SUB11}}&aff_sub12={{AFF_SUB12}}&aff_sub13={{AFF_SUB13}}&aff_sub14={{AFF_SUB14}}&aff_sub15={{AFF_SUB15}}&aff_sub16={{AFF_SUB16}}`;
      break;
    case platform === "bing":
      link = `https://${domain}/click?trvid=${id}&aff_sub1={{AFF_SUB1}}&aff_sub2={{AFF_SUB2}}&aff_sub5={{AFF_SUB5}}&aff_sub7={{AFF_SUB7}}&aff_sub8={{AFF_SUB8}}&aff_sub9={{AFF_SUB9}}&aff_sub10={{AFF_SUB10}}&aff_sub12={{AFF_SUB12}}&aff_sub14={{AFF_SUB14}}`;
      break;
    case platform === "taboola":
      link = `https://${domain}/click?trvid=${id}&aff_sub={{AFF_SUB}}&aff_sub2={{AFF_SUB2}}&aff_sub3={{AFF_SUB3}}&aff_sub4={{AFF_SUB4}}&aff_sub5={{AFF_SUB5}}&aff_sub6={{AFF_SUB6}}&aff_sub7={{AFF_SUB7}}&aff_sub8={{AFF_SUB8}}&aff_sub9={{AFF_SUB9}}&aff_sub11={{AFF_SUB11}}`;
      break;
    case platform === "twitter":
      link = `https://${domain}/click?trvid=${id}`;
      break;
    case platform === "tiktok":
      link = `https://${domain}/click?trvid=${id}`;
      break;
    default:
      break;
  }
  return link;
};