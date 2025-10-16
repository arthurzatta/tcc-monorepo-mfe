import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Patient } from "@/types/patient";
import { cva } from "class-variance-authority";
import { History } from "history";
import {
  Calendar as CalendarIcon,
  EditIcon,
  MapPinIcon,
  PawPrintIcon,
  UserIcon,
  VenusAndMarsIcon,
} from "lucide-react";
import { HTMLAttributes, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePatient } from "../../context/patient";

const cardCva = cva("rounded-[8px] bg-white drop-shadow-sm");
const cardItemCva = cva("rounded-[4px] border border-[#D9D9D9]");
const cardHeaderCva = cva(
  "w-full flex gap-2 items-center text-sm font-medium text-black px-3 pt-3 pb-1",
);

type PatientsPageProps = { history: History };

const PatientPage = ({ history }: PatientsPageProps) => {
  const { selectedPatient, isLoading, setSelectedPatient } = usePatient();
  const params = useParams();

  const cachePatient = (patient: Patient) => {
    sessionStorage.setItem("selectedPatient", JSON.stringify(patient));
  };

  const loadFromCache = () => {
    const sessionStoragePatient = sessionStorage.getItem("selectedPatient");
    if (sessionStoragePatient) {
      const patient = JSON.parse(sessionStoragePatient) as Patient;
      if (patient.id === params.id) setSelectedPatient(patient);
    }
  };

  useEffect(() => {
    if (selectedPatient) {
      cachePatient(selectedPatient);
    } else {
      loadFromCache();
    }
  }, [selectedPatient]);

  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center">
        <div>Carregando informações do paciente...</div>
      </div>
    );
  }

  if (!selectedPatient) {
    return (
      <div className="size-full flex items-center justify-center">
        <div>Nenhum paciente selecionado</div>
      </div>
    );
  }

  return (
    <div className="size-full grid grid-cols-12 grid-rows-8 gap-3">
      <div className={cn(cardCva(), "col-span-12 row-span-1 flex gap-4 p-3")}>
        {/* Image */}
        <div className="w-40 h-full rounded-[6px] bg-black"></div>

        <div className="flex flex-col justify-between">
          {/* Informations */}
          <div className="flex flex-col gap-1">
            <div className="font-bold text-xl text-black">
              {selectedPatient.name}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
              <div className="flex gap-1 items-center">
                <UserIcon className="size-4 text-black" />
                <div>{selectedPatient.ownerName}</div>
              </div>

              <div className="flex gap-1 items-center">
                <PawPrintIcon className="size-4 text-black" />
                <div>
                  {selectedPatient.type === "cat" ? "Gato" : "Cachorro"}
                </div>
              </div>

              {selectedPatient.gender && (
                <div className="flex gap-1 items-center">
                  <VenusAndMarsIcon className="size-4 text-black" />
                  <div>
                    {selectedPatient.gender === "male" ? "Macho" : "Fêmea"}
                  </div>
                </div>
              )}

              {selectedPatient.age && (
                <div className="flex gap-1 items-center">
                  <CalendarIcon className="size-4 text-black" />
                  <div>{selectedPatient.age} anos</div>
                </div>
              )}

              {selectedPatient.address && (
                <div className="flex gap-1 items-center">
                  <MapPinIcon className="size-4 text-black" />
                  <div>{selectedPatient.address}</div>
                </div>
              )}
            </div>
          </div>

          {/*Number Informations*/}
          <div className="flex gap-2">
            {selectedPatient.weight && (
              <NumberInformation
                value={selectedPatient.weight}
                unit="kg"
                label="Peso"
              />
            )}
            {selectedPatient.height && (
              <NumberInformation
                value={selectedPatient.height}
                unit="cm"
                label="Altura"
              />
            )}
            {selectedPatient.bloodPressure && (
              <NumberInformation
                value={selectedPatient.bloodPressure}
                label="Pressão Sanguínea"
              />
            )}
          </div>
        </div>

        <div className="ml-auto">
          <Button variant={"outline"}>
            <EditIcon />
            Edit
          </Button>

          <Button variant={"outline"} onClick={() => history.back()}>
            Voltar
          </Button>
        </div>
      </div>

      {/*Ultimos atendimentos*/}
      <div
        className={cn(cardCva(), "col-span-4 row-span-2 flex flex-col gap-4")}
      >
        <div className={cardHeaderCva()}>
          <div className="mr-auto">Últimos atendimentos</div>
          <a className="font-normal text-gray-300">Ver mais</a>
        </div>
        {/*
        <TimelineList>
          <TimelineItem
            day={selectedPatient.lastAppointment.getDate()}
            month={selectedPatient.lastAppointment.getMonth() + 1}
            year={selectedPatient.lastAppointment.getFullYear()}
            doctor={selectedPatient.lastDoctor}
            description={selectedPatient.lastAppointmentType}
            time="12:30"
          />
        </TimelineList>*/}
      </div>

      {/*Histórico médico*/}
      <div
        className={cn(cardCva(), "col-span-4 row-span-2 flex flex-col gap-4")}
      >
        <div className={cardHeaderCva()}>
          <div className="mr-auto">Histórico médico</div>
          <a className="font-normal text-gray-300">Editar</a>
        </div>
        <div className="size-full grid grid-cols-2 grid-rows-8 gap-2 px-3 pb-3 pt-1">
          <HistoricCard
            label="Castrado"
            description={selectedPatient.isNeutered ? "Sim" : "Não"}
          />
          {selectedPatient.microchip && (
            <HistoricCard
              label="Microchip"
              description={selectedPatient.microchip}
            />
          )}
          <HistoricCard
            label="Vermifugado"
            description={selectedPatient.isDewormed ? "Sim" : "Não"}
          />
          {selectedPatient.surgeries &&
            selectedPatient.surgeries.length > 0 && (
              <HistoricCard
                label="Cirurgias"
                description={selectedPatient.surgeries.join(", ")}
              />
            )}
          {selectedPatient.chronicDiseases &&
            selectedPatient.chronicDiseases.length > 0 && (
              <HistoricCard
                label="Doenças crônicas"
                description={selectedPatient.chronicDiseases.join(", ")}
                className="col-span-2"
              />
            )}
        </div>
      </div>

      {/*Alimentação*/}
      <div
        className={cn(cardCva(), "col-span-4 row-span-2 flex flex-col gap-4")}
      >
        <div className={cardHeaderCva()}>
          <div className="mr-auto">Alimentação</div>
          <a className="font-normal text-gray-300">Adicionar</a>
        </div>

        <div className="p-3 flex flex-col gap-2">
          {selectedPatient.diet && selectedPatient.diet.length > 0 ? (
            selectedPatient.diet.map((food, index) => (
              <HistoricCard key={index} label="" description={food} />
            ))
          ) : (
            <div className="text-sm text-gray-400">
              Nenhuma informação de alimentação
            </div>
          )}
        </div>
      </div>

      {/*Medicações*/}
      <div
        className={cn(cardCva(), "col-span-6 row-span-2 flex flex-col gap-4")}
      >
        <div className={cardHeaderCva()}>
          <div className="mr-auto">Medicações</div>
          <a className="font-normal text-gray-300">Editar</a>
        </div>
        <div className="size-full grid grid-cols-2 grid-rows-8 gap-2 p-3">
          {selectedPatient.medications &&
          selectedPatient.medications.length > 0 ? (
            selectedPatient.medications.map((medication, index) => (
              <HistoricCard key={index} label="" description={medication} />
            ))
          ) : (
            <div className="text-sm text-gray-400">Nenhuma medicação</div>
          )}
        </div>
      </div>

      {/*Serviços*/}
      <div
        className={cn(cardCva(), "col-span-6 row-span-2 flex flex-col gap-4")}
      >
        <div className={cardHeaderCva()}>
          <div className="mr-auto">Serviços</div>
          <a className="font-normal text-gray-300">Adicionar</a>
        </div>
        <div className="p-3 flex flex-col gap-2">
          {selectedPatient.services && selectedPatient.services.length > 0 ? (
            selectedPatient.services.map((service, index) => (
              <HistoricCard key={index} label="" description={service} />
            ))
          ) : (
            <div className="text-sm text-gray-400">Nenhum serviço</div>
          )}
        </div>
      </div>

      {/*Observações*/}
      <div
        className={cn(
          cardCva(),
          "col-span-full row-span-1 flex flex-col gap-4",
        )}
      >
        <div className={cardHeaderCva()}>
          <div className="mr-auto">Observações</div>
          <a className="font-normal text-gray-300">Adicionar</a>
        </div>
        <div className="p-3">
          {selectedPatient.observations ? (
            <div className="text-sm text-black">
              {selectedPatient.observations}
            </div>
          ) : (
            <div className="text-sm text-gray-400">Nenhuma observação</div>
          )}
        </div>
      </div>
    </div>
  );
};

type HistoricCardProps = {
  label: string;
  description: string;
  className?: string;
};

const HistoricCard = ({ label, description, className }: HistoricCardProps) => {
  return (
    <div
      className={cn(
        cardItemCva(),
        "row-span-2 p-2 flex flex-col gap-1 font-semibold",
        className,
      )}
    >
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm text-black">{description}</div>
    </div>
  );
};

type NumberInformationProps = {
  value: number | string;
  unit?: string;
  label: string;
};

const NumberInformation = ({ value, unit, label }: NumberInformationProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-40 h-full border border-dashed rounded-md py-1 px-2 text-[#D9D9D9] font-semibold text-sm">
        <div className="flex items-baseline gap-2">
          <div className="text-black text-xl">{value}</div>
          {unit && <div>{unit}</div>}
        </div>
        <div>{label}</div>
      </div>
    </div>
  );
};

type TimelineListProps = {
  children: React.ReactNode;
};

const TimelineList = ({ children }: TimelineListProps) => {
  return <div className="overflow-y-auto size-full">{children}</div>;
};

type TimelineItemProps = {
  month: number;
  day: number;
  year: number;
  time: string;
  description: string;
  doctor: string;
} & HTMLAttributes<HTMLButtonElement>;

const TimelineItem = (props: TimelineItemProps) => {
  const { month, day, time, year, description, doctor, className, ...rest } =
    props;

  const MONTHS = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  return (
    <button
      {...rest}
      className={cn(
        className,
        "w-full flex gap-3 items-start text-start h-10 hover:bg-gray-50 rounded-sm px-3 py-0.5",
      )}
    >
      {/*Mes/ano*/}
      <div className="h-full flex flex-col text-[10px] font-semibold">
        <div className="text-black leading-none">
          {day} {MONTHS[month - 1]}
        </div>
        <div className="text-gray-400">{year}</div>
      </div>
      {/*Divider*/}
      <div className="h-full flex flex-col gap-1 items-center">
        <div className="border-2 border-green-800 rounded-full size-1 p-0.5" />
        <hr className="h-full w-0.5 bg-gray-300" />
      </div>
      {/*Atendimento realizado e dia e horário e médico*/}
      <div className="flex flex-col gap-1 min-w-0 font-medium">
        <div className="text-xs text-black truncate leading-none">
          {description}
        </div>
        <div className="text-[10px] text-gray-400">
          {time} - {doctor}
        </div>
      </div>
    </button>
  );
};

export default PatientPage;
