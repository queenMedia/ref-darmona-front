export const generateThriveLink = (domain, platform, id) => {
  let link = "";
  switch (true) {
    case platform === "facebook":
      link = `https://${domain}/click?trvid=${id}&ad_id={{AD_ID}}&adset_id={{ADSET_ID}}&campaign_id={{CAMPAIGN_ID}}&ad_name={{AD_NAME}}&adset_name={{ADSET_NAME}}&campaign_name={{CAMPAIGN_NAME}}&placement={{PLACEMENT}}&site_source_name={{SITE_SOURCE_NAME}}`;
      break;
    case platform === "google":
      link = `https://${domain}/click?trvid=${id}&ad_id={{AD_ID}}&adset_id={{ADSET_ID}}&campaign_id={{CAMPAIGN_ID}}&ad_name={{AD_NAME}}&adset_name={{ADSET_NAME}}&campaign_name={{CAMPAIGN_NAME}}&placement={{PLACEMENT}}&site_source_name={{SITE_SOURCE_NAME}}`;
      break;
    case platform === "bing":
      link = `https://${domain}/click?trvid=${id}&ad_id={{AD_ID}}&adset_id={{ADSET_ID}}&campaign_id={{CAMPAIGN_ID}}&ad_name={{AD_NAME}}&adset_name={{ADSET_NAME}}&campaign_name={{CAMPAIGN_NAME}}&placement={{PLACEMENT}}&site_source_name={{SITE_SOURCE_NAME}}`;
      break;
    case platform === "bingLeo":
      link = `https://${domain}/click?trvid=${id}&ad_id={{AD_ID}}&adset_id={{ADSET_ID}}&campaign_id={{CAMPAIGN_ID}}&ad_name={{AD_NAME}}&adset_name={{ADSET_NAME}}&campaign_name={{CAMPAIGN_NAME}}&placement={{PLACEMENT}}&site_source_name={{SITE_SOURCE_NAME}}`;
      break;
    default:
      break;
  }
  return link;
};