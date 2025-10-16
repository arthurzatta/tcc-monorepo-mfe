import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History } from "history";
import React, { HTMLAttributes } from "react";

const animalsList: Animal[] = [
  {
    id: "1",
    name: "Toto",
    type: "dog",
    lastAppointment: new Date("2021-01-01"),
    appointment: "Atendimento",
    lastDoctor: "Dr. Smith",
  },
  {
    id: "2",
    name: "Mimi",
    type: "cat",
    lastAppointment: new Date("2021-02-15"),
    appointment: "Vacinação",
    lastDoctor: "Dr. Johnson",
  },
  {
    id: "3",
    name: "Rex",
    type: "dog",
    lastAppointment: new Date("2021-03-10"),
    appointment: "Consulta",
    lastDoctor: "Dr. Brown",
  },
  {
    id: "4",
    name: "Luna",
    type: "cat",
    lastAppointment: new Date("2021-04-05"),
    appointment: "Cirurgia",
    lastDoctor: "Dr. White",
  },
  {
    id: "5",
    name: "Buddy",
    type: "dog",
    lastAppointment: new Date("2021-05-20"),
    appointment: "Check-up",
    lastDoctor: "Dr. Green",
  },
];

type PatientsListPageProps = { history: History };

type RowCardProps = HTMLAttributes<HTMLDivElement>;
const RowCardLine = (props: RowCardProps) => (
  <div className="flex justify-between" {...props}></div>
);

const RowCardLabel = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="font-semibold" {...props}></div>
);

const PatientsListMobilePage: React.FC<PatientsListPageProps> = () => {
  return (
    <div className="size-full p-4 overflow-auto">
      <div className="flex justify-start items-center gap-2 mb-4">
        <Input placeholder="Search patients" />
        <Button>Adicionar</Button>
        <Button>Import</Button>
      </div>
      <div>
        {animalsList.map((animal) => (
          <div
            key={animal.id}
            className="flex flex-col gap-2 p-4 rounded-md  odd:bg-gray-200 mb-2"
          >
            <RowCardLine>
              <RowCardLabel>Nome</RowCardLabel>
              <div>{animal.name}</div>
            </RowCardLine>
            <RowCardLine>
              <RowCardLabel>Tipo</RowCardLabel>
              <div>{animal.type}</div>
            </RowCardLine>
            <RowCardLine>
              <RowCardLabel>Atendimento</RowCardLabel>
              <div>{animal.appointment}</div>
            </RowCardLine>
            <RowCardLine>
              <RowCardLabel>Último atendimento</RowCardLabel>
              <div>{animal.lastAppointment.toLocaleDateString()}</div>
            </RowCardLine>
            <RowCardLine>
              <RowCardLabel>Último médico</RowCardLabel>
              <div>{animal.lastDoctor}</div>
            </RowCardLine>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsListMobilePage;

type Animal = {
  id: string;
  name: string;
  type: "cat" | "dog";
  lastAppointment: Date;
  appointment: string;
  lastDoctor: string;
};
