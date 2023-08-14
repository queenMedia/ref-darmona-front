import React, { useEffect, useState } from "react";
import { Box } from "../../components/box/box";
import { api } from "../../utils/api";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/getc";
import { useNavigate } from "react-router-dom";
import { validateLettersOnly } from "../../utils/validateInput";
import "./form.css";

const Form = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleUsername = (event) => {
    setUsername(validateLettersOnly(event.target.value));
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box>
      <h1>Campaign information</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          onChange={handleUsername}
          value={username}
          required
          placeholder="Name"
        />
        <input
          type="text"
          onChange={handlePassword}
          value={password}
          placeholder="Alias Url"
          required
        />
        <input
          type="number"
          onChange={handlePassword}
          value={password}
          placeholder="Skip imppressions"
          required
        />
      </form>
    </Box>
  );
};

export default Form;
