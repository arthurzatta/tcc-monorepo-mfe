export type Patient = {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  cpf: string;
  type: "cat" | "dog";
  gender?: "male" | "female";
  age?: number;
  weight?: number;
  height?: number;
  bloodPressure?: string;
  address?: string;
  lastAppointment: Date;
  lastDoctor: string;
  lastAppointmentType: string;
  microchip?: string;
  isNeutered?: boolean;
  isDewormed?: boolean;
  surgeries?: string[];
  chronicDiseases?: string[];
  medications?: string[];
  diet?: string[];
  services?: string[];
  observations?: string;
  imageUrl?: string;
};

export type PatientContextType = {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};
