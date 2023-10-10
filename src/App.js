import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import CmpList from "./pages/cmpList/cmpList";
import SnowPage from "./pages/snow/snow";
import AddCmp from "./pages/addCmp/addCmp";
import EditCmp from "./pages/editCmp/editCmp";
import Domains from "./pages/domains/domains";
import Params from "./pages/params/params";
import DuplcateCmp from "./pages/duplicateCmp/duplicateCmp";
import { api } from "./utils/api";
import { getCookie } from "./utils/getc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/user";
import { Sidebar } from "./components/sidebar/sidebar";
import { ToastContainer } from "react-toastify";
import AutoLogout from "./utils/AutoLogout"
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [userExist, setUserExist] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (username, password) => {
    const user = await api.login(username, password);
    if (user?.data) {
      const cookie = getCookie("jwt");
      user.data.token = cookie;
      dispatch(setUser(user.data));
      setUserExist(true);
      navigate(window.location.pathname === "/" ? "/cmplist" : window.location.pathname);
    } else {
      navigate("/");
      setUserExist(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
      handleLogin(username, password);
    } else {
      navigate("/");
      setUserExist(false);
    }
  }, []);

  return (
    <>
      {userExist === true ? (
        <AutoLogout>
          <div className="app-container">
            <header >
              <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            </header>

            <main>
              <aside>
                <Sidebar />
              </aside>

              <div className="content">
                <Routes>
                  <Route path="/cmplist" exact element={<CmpList />} />
                  <Route path="/cmplist/addnew" exact element={<AddCmp />} />
                  <Route path="/cmplist/editcmp/:id/:cmpName/:status" exact element={<EditCmp />} />
                  <Route path="/cmplist/duplicate/:id/:cmpName/:status" exact element={<DuplcateCmp />} />
                  <Route path="/domains" exact element={<Domains />} />
                  <Route path="/snow" exact element={<SnowPage />} />
                  <Route path="/params" exact element={<Params />} />
                </Routes>
              </div>
            </main>
          </div>
        </AutoLogout>
      ) : userExist === false ? (
        <div className="login-container">
          <Login setUserExist={setUserExist} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
