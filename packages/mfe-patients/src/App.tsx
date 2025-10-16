import { History } from "history";
import React, { StrictMode } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { PatientProvider } from "./context/patient";
import AddPatients from "./pages/add-patients";
import PatientPage from "./pages/patient/page";
import BaseTemplate from "./templates/base.template";

type AppProps = { history: History; basename: string };

const PatientsListPage = React.lazy(() =>
  import("./pages/patients-list").catch(() => ({
    default: () => <div>Failed to load dashboard</div>,
  })),
);

const App: React.FC<AppProps> = ({ history, basename }) => {
  const [state, setState] = React.useState({
    location: history.location,
    action: history.action,
  });

  React.useLayoutEffect(() => history.listen(setState), []);

  return (
    <StrictMode>
      <PatientProvider>
        <div className="size-full bg-[#f8f9fd]">
          <Router
            navigator={history}
            basename={basename}
            location={state.location}
          >
            <Routes>
              <Route element={<BaseTemplate />}>
                <Route
                  path="/"
                  element={<PatientsListPage history={history} />}
                  index
                />
                <Route
                  path="/:id"
                  element={<PatientPage history={history} />}
                />
                <Route
                  path="insert"
                  element={<AddPatients history={history} />}
                />
              </Route>
            </Routes>
          </Router>
        </div>
      </PatientProvider>
    </StrictMode>
  );
};

export default App;
