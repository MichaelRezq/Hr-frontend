import "./App.css";
import React from "react";
import SignUp from "./pages/Registeration/SignUp";
import Login from "./pages/Registeration/Login";
import Logout from "./pages/Registeration/Logout";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/Notfound/NotFound";
import ListEmployees from "./pages/employees/ListEmployees";

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Login" component={Login} />
          <Route path="/Logout" component={Logout} />
          <Route path="/Employee" component={ListEmployees} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
