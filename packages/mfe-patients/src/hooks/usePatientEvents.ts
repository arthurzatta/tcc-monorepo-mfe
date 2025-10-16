import { usePatient } from "../context/patient";
import { Patient } from "../types/patient";

export const usePatientEvents = () => {
  const { setSelectedPatient, setIsLoading } = usePatient();

  const handlePatientData = (event: any) => {
    const { animal } = event.detail;

    if (animal) {
      setIsLoading(true);

      const patient: Patient = {
        id: animal.id,
        name: animal.name,
        ownerName: animal.ownerName || "",
        phone: animal.phone || "",
        cpf: animal.cpf || "",
        type: animal.type,
        lastAppointment: new Date(animal.lastAppointment),
        lastDoctor: animal.lastDoctor || "",
        lastAppointmentType: animal.lastAppointmentType || "",
        // Campos opcionais que podem vir dos dados
        gender: animal.gender,
        age: animal.age,
        weight: animal.weight,
        height: animal.height,
        bloodPressure: animal.bloodPressure,
        address: animal.address,
        microchip: animal.microchip,
        isNeutered: animal.isNeutered,
        isDewormed: animal.isDewormed,
        surgeries: animal.surgeries,
        chronicDiseases: animal.chronicDiseases,
        medications: animal.medications,
        diet: animal.diet,
        services: animal.services,
        observations: animal.observations,
        imageUrl: animal.imageUrl,
      };

      setSelectedPatient(patient);
      setIsLoading(false);
    } else {
      throw new Error("Invalid animal data");
    }
  };

  return { handlePatientData }; // Este hook não retorna nada, apenas configura os listeners
};
