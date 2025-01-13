import { History } from "history";
import React, { StrictMode } from "react";
import { Route, Router, Routes } from "react-router-dom";
import AddPatients from "./pages/add-patients";
import PatientPage from "./pages/patient";
import PatientsListMobilePage from "./pages/patient-list.mobile";
import PatientsListPage from "./pages/patients-list";

type AppProps = { history: History; basename: string };

const App: React.FC<AppProps> = ({ history, basename }) => {
  const [state, setState] = React.useState({
    location: history.location,
    action: history.action,
  });

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    });
  }, []);

  React.useLayoutEffect(() => history.listen(setState), []);

  const PatientsList = isMobile ? PatientsListMobilePage : PatientsListPage;

  return (
    <StrictMode>
      <div className="size-full">
        <Router
          navigator={history}
          basename={basename}
          location={state.location}
        >
          <Routes>
            <Route path="list" element={<PatientsList history={history} />} />
            <Route
              path="list/:id"
              element={<PatientPage history={history} />}
            />
            <Route path="insert" element={<AddPatients history={history} />} />
          </Routes>
        </Router>
      </div>
    </StrictMode>
  );
};

export default App;
