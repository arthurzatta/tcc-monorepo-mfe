import { createBrowserHistory } from "history";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/page";
import Router from "./routes/router";
import Template from "./template/template";

const Patients = React.lazy(() =>
  import("./page/Patients/page").catch(() => ({
    default: () => <div>Failed to load patients</div>,
  })),
);

const Dashboard = React.lazy(() =>
  import("./page/Dashboard/page").catch(() => ({
    default: () => <div>Failed to load dashboard</div>,
  })),
);

function App() {
  const browserHistory = createBrowserHistory();

  return (
    <Suspense fallback="Loading...">
      <Router history={browserHistory}>
        <Routes>
          <Route element={<Template />}>
            <Route path="/*" element={<Home />} />
            <Route
              path={"patients/*"}
              element={
                <Patients history={browserHistory} basename="patients" />
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
