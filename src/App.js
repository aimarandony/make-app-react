import React, { useState } from "react";

import AppRouter from "./routers/AppRouter";

import "./App.less";
import { AuthContext } from "./auth/AuthContext";

const App = () => {
  const [authenticated, setAuthenticated] = useState(true);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
