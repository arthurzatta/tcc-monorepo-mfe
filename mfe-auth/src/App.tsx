import { History } from "history";
import React, { StrictMode } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

type AppProps = { history: History; basename: string };

const App: React.FC<AppProps> = ({ history, basename }) => {
  return (
    <StrictMode>
      <Router
        navigator={history}
        basename={basename}
        location={history.location}
        navigationType={history.action}
      >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recovery-password" element={<Register />} />
        </Routes>
      </Router>
    </StrictMode>
  );
};

export default App;
