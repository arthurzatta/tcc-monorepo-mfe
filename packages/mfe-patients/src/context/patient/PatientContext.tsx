import { createContext } from "react";
import { PatientContextType } from "../../types/patient";

export const PatientContext = createContext<PatientContextType | undefined>(
  undefined,
);
