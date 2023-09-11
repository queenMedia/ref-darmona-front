import React, { useState } from "react";
import { Box } from "../box/box";
import { useSelector } from "react-redux";
import { notify_error, notify_Info, handleCopy } from "../../utils/notify";
import { api } from "../../utils/api";

export const SelectWP = (props) => {
  const user = useSelector((state) => state.user);
  const [lang, setLang] = useState("");
  const [link, setLink] = useState("");
  const [wpData, setWpData] = useState([]);
  const [languageList, setLanguages] = useState([]);
  const [topicList, setTopics] = useState([]);

  const handleDomainSelect = async (selectedDomain) => {
    try {
      const data = await api.getWhitePages(selectedDomain, "", "", user.token);
      console.log(data);
      if (data?.length < 1) {
        notify_Info("did not find any pages on this domain");
        return;
      } else {
        notify_Info(`${data.length} pages found`);
      }
      setWpData(data);
      const uniqueLanguages = [...new Set(data.map((item) => item.language))];
      setLanguages(uniqueLanguages);
    } catch (error) {
      console.log(error);
      notify_error("Error in searching white pages");
    }
  };

  const handleLangSelect = async (selectedLanguage) => {
    try {
      setLang(selectedLanguage);
      const topics = wpData.filter((i) => i.language === selectedLanguage);
      if (topics?.length < 1) {
        notify_Info("did not find any pages on this topic");
        return;
      } else {
        notify_Info(`${topics.length} pages found`);
      }
      const uniqueTopics = [...new Set(topics.map((item) => item.topic))];
      setTopics(uniqueTopics);
    } catch (error) {
      console.log(error);
      notify_error("Error in searching white pages");
    }
  };

  const handleTopicSelect = (selectedTopic) => {
    notify_Info("generating link");
    const obj = wpData.find(
      (i) => selectedTopic === i.topic && lang === i.language
    );
    console.log(obj);
    setLink(obj.link);
    props.setWhitePage(encodeURI(obj.link));
  };

  return (
    <Box>
      <h1>White Page</h1>
      <div className="formBody">
        <select onChange={(e) => handleDomainSelect(e.target.value)}>
          <option>Select Domain</option>;
          {user.aliases.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
        <select onChange={(e) => handleLangSelect(e.target.value)}>
          {<option>Select Language</option>}
          {languageList.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
        <select onChange={(e) => handleTopicSelect(e.target.value)}>
          {<option>Select Topic</option>}
          {topicList.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
        <input onClick={(e) => handleCopy(link)} value={link} readOnly />
      </div>
    </Box>
  );
};
