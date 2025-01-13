import { History } from "history";
import React, { StrictMode, useLayoutEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

type AppProps = { history: History; basename: string };

const App: React.FC<AppProps> = ({ history, basename }) => {
  const [state, setState] = React.useState({
    location: history.location,
    action: history.action,
  });

  useLayoutEffect(() => history.listen(setState), []);

  return (
    <StrictMode>
      <div className="size-full">
        <Router
          navigator={history}
          basename={basename}
          location={state.location}
          navigationType={state.action}
        >
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="recovery-password" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </StrictMode>
  );
};

export default App;
