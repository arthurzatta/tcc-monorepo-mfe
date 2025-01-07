import { Combobox } from "@/components/containers/combobox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { animalsList } from "@/mocks/patients.mock";
import { History } from "history";
import { XIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

type FilterItemProps = {
  item: { label: string; value: string };
  className?: string;
};

const FilterItem = ({ item, className }: FilterItemProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center w-fit text-[10px] p-1 border bg-gray-100 rounded-sm font-semibold",
        className
      )}
    >
      <div className="text-black">
        {item.label}: {item.value}
      </div>
      <div className="text-gray-400">
        <XIcon className="size-3" />
      </div>
    </div>
  );
};

type PatientsListPageProps = { history: History };

const PatientsListPage: React.FC<PatientsListPageProps> = () => {
  const addCpfMask = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
  };

  const [typeFilterSelection, setTypeFilterSelection] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [ownerFilterSelection, setOwnerFilterSelection] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [serviceFilterSelection, setServiceFilterSelection] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [doctorFilterSelection, setDoctorFilterSelection] = React.useState<
    { label: string; value: string }[]
  >([]);

  const getFilterSet = (
    callback: (animal: (typeof animalsList)[0]) => {
      label: string;
      value: string;
    }
  ) => {
    return Array.from(
      new Set(animalsList.map((animal) => JSON.stringify(callback(animal))))
    ).map((item) => JSON.parse(item));
  };

  const typeFilterItems = getFilterSet((animal) => ({
    label: animal.type,
    value: animal.type,
    valueKey: "type",
  }));
  const ownerFilterItems = getFilterSet((animal) => ({
    label: animal.ownerName,
    value: animal.cpf,
    valueKey: "cpf",
  }));
  const appointmentFilterItems = getFilterSet((animal) => ({
    label: animal.lastAppointmentType,
    value: animal.lastAppointmentType,
    valueKey: "lastAppointmentType",
  }));
  const doctorFilterItems = getFilterSet((animal) => ({
    label: animal.lastDoctor,
    value: animal.lastDoctor,
    valueKey: "lastDoctor",
  }));

  const onApplyFilterType = (values: string[]) => {
    const selected = typeFilterItems.filter((item) =>
      values.includes(item.value)
    );
    setTypeFilterSelection(selected);
  };

  const onApplyFilterOwner = (values: string[]) => {
    const selected = ownerFilterItems.filter((item) =>
      values.includes(item.value)
    );
    setOwnerFilterSelection(selected);
  };

  const onApplyFilterAppointment = (values: string[]) => {
    const selected = appointmentFilterItems.filter((item) =>
      values.includes(item.value)
    );
    setServiceFilterSelection(selected);
  };

  const onApplyFilterDoctor = (values: string[]) => {
    const selected = doctorFilterItems.filter((item) =>
      values.includes(item.value)
    );
    setDoctorFilterSelection(selected);
  };

  // Corrigir esse filtro para que ele vá encadeando os filtros
  const list = useMemo(() => {
    const result = [];
    for (const animal of animalsList) {
      if (
        typeFilterSelection.length > 0 &&
        !typeFilterSelection.find((item) => item.value === animal.type)
      ) {
        continue;
      }

      if (
        ownerFilterSelection.length > 0 &&
        !ownerFilterSelection.find((item) => item.value === animal.cpf)
      ) {
        continue;
      }

      if (
        serviceFilterSelection.length > 0 &&
        !serviceFilterSelection.find(
          (item) => item.value === animal.lastAppointmentType
        )
      ) {
        continue;
      }

      if (
        doctorFilterSelection.length > 0 &&
        !doctorFilterSelection.find((item) => item.value === animal.lastDoctor)
      ) {
        continue;
      }

      result.push(animal);
    }
    return result;
  }, [
    typeFilterSelection,
    ownerFilterSelection,
    serviceFilterSelection,
    doctorFilterSelection,
  ]);

  return (
    <div className="size-full flex bg-gray-100">
      <div className="size-full p-4 space-y-3">
        <div className="flex gap-2 items-center">
          <Combobox
            placeholder="Responsável"
            items={ownerFilterItems}
            onApply={onApplyFilterOwner}
          />
          <Combobox
            placeholder="Tipo"
            items={typeFilterItems}
            onApply={onApplyFilterType}
          />
          <Combobox
            placeholder="Atendimento"
            items={appointmentFilterItems}
            onApply={onApplyFilterAppointment}
          />
          <Combobox
            placeholder="Médico"
            items={doctorFilterItems}
            onApply={onApplyFilterDoctor}
          />
        </div>
        <div className="flex flex-col border rounded-sm bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={8}>
                  <div className="flex justify-between items-center mr-3 text-xs font-normal">
                    <div className="flex items-center gap-2 w-full">
                      <Checkbox aria-label="Select all rows" />0 Selecionados
                      <div className="h-8 w-[1px] bg-gray-200" />
                      <Input placeholder="Search patients" className="w-1/2" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="xs">Adicionar</Button>
                      <Button size="xs">Import</Button>
                    </div>
                  </div>
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Último atendimento</TableHead>
                <TableHead>Última visita</TableHead>
                <TableHead>Último médico</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Checkbox aria-label="Select row" />
                      <Link
                        to={`/patients/${animal.id}`}
                        className="underline font-medium"
                      >
                        {animal.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{animal.ownerName}</TableCell>
                  <TableCell>{addCpfMask(animal.cpf)}</TableCell>
                  <TableCell>{animal.phone}</TableCell>
                  <TableCell>{animal.type}</TableCell>
                  <TableCell>{animal.lastAppointmentType}</TableCell>
                  <TableCell>
                    {animal.lastAppointment.toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>{animal.lastDoctor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PatientsListPage;
