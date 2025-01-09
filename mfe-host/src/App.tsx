import { createBrowserHistory } from "history";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard/page";
import Home from "./page/Home/page";
import Router from "./routes/router";
import Template from "./template/template";

const Auth = React.lazy(() =>
  import("./page/Auth/page").catch(() => ({
    default: () => <div>Failed to load auth</div>,
  }))
);

const Patients = React.lazy(() =>
  import("./page/Patients/page").catch(() => ({
    default: () => <div>Failed to load patients</div>,
  }))
);

function App() {
  const browserHistory = createBrowserHistory();

  return (
    <Suspense fallback="Loading Auth...">
      <Router history={browserHistory}>
        <Routes>
          <Route element={<Template />}>
            <Route index element={<Home />} />
            <Route
              path={"/*"}
              element={<Auth history={browserHistory} basename={"/"} />}
            />
            <Route
              path={"patients/*"}
              element={
                <Patients history={browserHistory} basename="patients/" />
              }
            />
            <Route path={"dashboard"} element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
