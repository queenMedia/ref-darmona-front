import React, { useState } from "react";
import { Box } from "../box/box";
import { useSelector } from "react-redux";
import { notify_error, notify_Info, handleCopy } from "../../utils/notify";
import { Select } from "../../origins/select/select"
import { api } from "../../utils/api";

export const SelectWP = (props) => {
  const user = useSelector((state) => state.user);
  const [lang, setLang] = useState("");
  const [link, setLink] = useState("");
  const [wpData, setWpData] = useState([]);
  const [languageList, setLanguages] = useState([]);
  const [topicList, setTopics] = useState([]);

  const [selectedType, setSelectedType] = useState("");
  const [htmlLinks, setHtmlLinks] = useState([]);
  const types = ["url", "html"];

  const handleDomainSelect = async (selectedDomain) => {
    try {
      if (selectedType === "") {
        notify_error("you must select a link type");
        return;
      }
      const data = await api.getWhitePages(selectedDomain, "", "", user.token);
      if (data?.length < 1) {
        notify_Info("did not find any pages on this domain");
        return;
      } else {
        notify_Info(`${data.length} pages found`);
      }
      console.log(data);
      const filterdData = data.filter((i) => i.linkType === selectedType);
      setWpData(filterdData);
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

  const handleSelectType = async (type) => {
    try {
      setSelectedType(type);
      if (type === "url") {
        return;
      } else {
        const resp = await api.getWhitePageHtmlType(user.token);
        console.log(resp);
        notify_Info(`${resp.length} pages found`);
        setHtmlLinks(resp);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLinkSelect = (htmlLink) => {
    setLink(htmlLink);
    props.setWhitePage(htmlLink);
  };

  return (
    <Box>
      <h1>White Page</h1>
      <div className="formBody">
        <Select
          required={true}
          data={types}
          title={"Select Type"}
          func={handleSelectType}
        />
        {selectedType === "url" ? (
          <>
            <Select
              required={true}
              data={user.aliases}
              title={"Select Domain"}
              func={handleDomainSelect}
            />
            <Select
              required={true}
              data={languageList}
              title={"Select Language"}
              func={handleLangSelect}
            />
            <Select
              required={true}
              data={topicList}
              title={"Select Topic"}
              func={handleTopicSelect}
            />
          </>
        ) : (
          <Select
            required={true}
            data={htmlLinks.map(i => i.link)}
            title={"Select Html Page"}
            func={handleLinkSelect}
          />
        )}
        <input onClick={(e) => handleCopy(link)} value={link} readOnly />
      </div>
    </Box>
  );
};
