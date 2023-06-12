import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/forms/loginForm";
import AddResource from "./components/forms/addResource";
import AddProject from "./components/forms/addProject";
import UpdateResource from "./components/forms/updateResource";
import UpdateProject from "./components/forms/updateProjectDetails";
import AddUserInfo from "./components/forms/addUserInfo";
import Header from "./components/header";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Home from "./components/home";
import axios from 'axios';

const menuItemsAdmin = [
  { name: "Home", path: "/Home" },
  { name: "Add Project", path: "/AddProject" },
  { name: "Add Resource", path: "/AddResource" },
  { name: "Update Resource", path: "/UpdateResource" },
  { name: "Update Project", path: "/UpdateProject" },
  { name: "AddUser Info", path: "/AddUserInfo" },
];

const menuItemsUser = [
  { name: "Home", path: "/Home" },
  { name: "AddUser Info", path: "/AddUserInfo" },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [useDetails, setUseDetails] = React.useState({});

  useEffect(() => {
    axios
      .get("http://172.17.160.1:2023/getMessage")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [""]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Header
            menuItems={
              useDetails.email === "user" ? menuItemsUser : menuItemsAdmin
            }
          />
          <Box mt={10}>
            <Routes>
              <Route
                exact
                path="/"
                element={<Home operator={useDetails.email} />}
              />
              <Route
                exact
                path="/Home"
                element={<Home operator={useDetails.email} />}
              />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/AddResource" element={<AddResource />} />
              <Route exact path="/AddProject" element={<AddProject />} />
              <Route
                exact
                path="/UpdateResource"
                element={<UpdateResource />}
              />
              <Route exact path="/UpdateProject" element={<UpdateProject />} />
              <Route exact path="/AddUserInfo" element={<AddUserInfo />} />
            </Routes>
          </Box>
        </>
      ) : (
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setUseDetails={setUseDetails}
        />
      )}
      {/* <LoginForm />
      <AddResource/>
      <AddProject/>
      <UpdateResource/>
      <UpdateProject/>
      <AddUserInfo/> */}
    </div>
  );
}

export default App;
