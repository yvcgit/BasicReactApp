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

function App() {
  return (
    <div className="App">
      <Header />
      <Box mt={10}>
        <Routes>
          {/* <Route exact path="/" component={Home} />
<Route exact path="/home" component={Home} /> */}
          <Route
            exact
            path="/login"
            element={<LoginForm />}
          />
          <Route
            exact
            path="/AddResource"
            element={<AddResource />}
          />
          <Route
            exact
            path="/AddProject"
            element={<AddProject />}
          />
          <Route
            exact
            path="/UpdateResource"
            element={<UpdateResource />}
          />
          <Route
            exact
            path="/UpdateProject"
            element={<UpdateProject />}
          />
          <Route
            exact
            path="/AddUserInfo"
            element={<AddUserInfo />}
          />
        </Routes>
      </Box>

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
