import React, { useContext } from "react";

import LoginPage from "../pages/LoginPage";
import DashboardRoutes from "./DashboardRoutes";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const AppRouter = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/login"
          component={() =>
            !authenticated ? <LoginPage /> : <Redirect to="/" />
          }
        />
        <Route
          path="/"
          component={() =>
            authenticated ? <DashboardRoutes /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
