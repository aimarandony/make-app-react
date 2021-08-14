import React from "react";

import Dashboard from "../components/Dashboard";

import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import StudentPage from "../pages/StudentPage";

const DashboardRoutes = () => {
  return (
    <Dashboard>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/student" component={StudentPage} />
        <Redirect to="/home" />
      </Switch>
    </Dashboard>
  );
};

export default DashboardRoutes;
