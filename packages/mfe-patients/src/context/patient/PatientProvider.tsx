import React, { ReactNode, useState } from "react";

import { Patient, PatientContextType } from "../../types/patient";
import { PatientContext } from "./PatientContext";
type PatientProviderProps = {
  children: ReactNode;
};

const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value: PatientContextType = {
    selectedPatient,
    setSelectedPatient,
    isLoading,
    setIsLoading,
  };

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};

export default PatientProvider;
