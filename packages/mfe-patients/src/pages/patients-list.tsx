import { History } from "history";
import { mount as mountPatientsTable } from "mfe-dashboard/PatientsTable";
import { mount as mountPatientsFilterTable } from "mfe-dashboard/PatientsTableFilter";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePatientEvents } from "../hooks/usePatientEvents";

type PatientsListPageProps = { history: History };

const PatientsListPageContent: React.FC<PatientsListPageProps> = () => {
  const PatientsFilterTable = React.useRef<any>(null);
  const PatientsTable = React.useRef<any>(null);
  const loadead = React.useRef(false);
  const navigate = useNavigate();

  // Usar o hook para configurar os event listeners
  const { handlePatientData } = usePatientEvents();

  useEffect(() => {
    if (loadead.current) return;
    loadead.current = true;
    mountPatientsFilterTable(PatientsFilterTable.current);
    mountPatientsTable(PatientsTable.current);
  }, []);

  useEffect(() => {
    // Event listener para navegação após receber dados do paciente
    const handleEventData = (event: any) => {
      const { detail } = event as CustomEvent;
      const { animal } = detail;
      handlePatientData(event);
      navigate(`${animal.id}`);
    };

    window.addEventListener("mfe-dashboard/patient-data", handleEventData);

    return () => {
      window.removeEventListener("mfe-dashboard/patient-data", handleEventData);
    };
  }, [handlePatientData]);

  return (
    <div className="size-full flex flex-col gap-4 p-3">
      <div id="patients-filter-table" ref={PatientsFilterTable}></div>
      <div id="patients-table" ref={PatientsTable} className="h-full"></div>
    </div>
  );
};

const PatientsListPage: React.FC<PatientsListPageProps> = ({ history }) => {
  return <PatientsListPageContent history={history} />;
};

export default PatientsListPage;
