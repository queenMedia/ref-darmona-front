import React, {  useState } from "react";
import { Box } from "../../components/box/box";
import Logo from "../../assets/images/signin-logo.svg";
import { api } from "../../utils/api";
import { setUser } from "../../store/slices/user";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/getc";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    const user = await api.login(username, password);
    if (user?.data) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      const cookie = getCookie("jwt");
      console.log(document.cookie);
      console.log({cookie});
      user.data.token = cookie;
      dispatch(setUser(user.data));
      navigate("/cmplist");
      props.setUserExist(true);
    } else {
      alert("not found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      handleLogin(username, password);
    }
  };

  const validateLettersOnly = (inputValue) => {
    const regex = /^[a-zA-Z]+$/;
    let lettersOnlyValue;
    if (!regex.test(inputValue) && inputValue !== "") {
      lettersOnlyValue = inputValue.replace(/[^a-zA-Z]/g, "");
    } else {
      lettersOnlyValue = inputValue;
    }
    return lettersOnlyValue;
  };
  const handleUsername = (event) => {
    setUsername(validateLettersOnly(event.target.value));
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box>
      <img src={Logo} />
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleUsername}
          value={username}
          required
        />
        <input
          type="password"
          onChange={handlePassword}
          value={password}
          required
        />
        <button type="submit">Login</button>
      </form>
    </Box>
  );
};

export default Login;
