import { useContext } from "react";
import { PatientContextType } from "../../types/patient";
import { PatientContext } from "./PatientContext";

export const usePatient = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
};
