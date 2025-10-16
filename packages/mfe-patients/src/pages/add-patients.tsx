import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cva } from "class-variance-authority";
import { History } from "history";
import { CheckCircleIcon, CircleIcon } from "lucide-react";
import React from "react";

/*
[22:46, 1/6/2025] Bella ❤️: Uma aba de observações
[22:46, 1/6/2025] Bella ❤️: Historico de doenças
[22:46, 1/6/2025] Bella ❤️: Espaço para anexar exames
[22:47, 1/6/2025] Bella ❤️: CPF e endereço do tutor
[22:47, 1/6/2025] Bella ❤️: Espaço pro usuario colocar os produtos que tem na clinica e o preço de cada
[22:47, 1/6/2025] Bella ❤️: Aba para adicionar os serviços e produtos que o animal está consumindo
[22:48, 1/6/2025] Bella ❤️: Sisteminha em calendário pra colocar as marcações de consulta/exame/ vacina
[22:49, 1/6/2025] Bella ❤️: Contas diferemtes para cada vet para ele ter acesso ao calemdario dele
[22:49, 1/6/2025] Bella ❤️: Ou um unificado onde ele só seleciona o calendario dele
[22:49, 1/6/2025] Bella ❤️: Lugar pra registrar qual foi a forma de pagamento e se já está quitado ou não
*/

type PatientsListPageProps = { history: History };

const containerCva = cva("flex flex-col gap-2 w-full");
const titleCva = cva("font-bold text-sm text-left");

enum Steps {
  Animal = "animal_data",
  Owner = "owner_data",
  Address = "address_data",
}

const AddPatients: React.FC<PatientsListPageProps> = () => {
  const [completedSteps] = React.useState<Steps[]>([Steps.Animal]);

  const isAnimalStepCompleted = completedSteps.includes(Steps.Animal);
  const isOwnerStepCompleted = completedSteps.includes(Steps.Owner);
  const isAddressStepCompleted = completedSteps.includes(Steps.Address);

  const stepsLabel = [
    "Informações do animal",
    "Informações do responsável",
    "Endereço",
  ];
  const stepsState = [
    isAnimalStepCompleted,
    isOwnerStepCompleted,
    isAddressStepCompleted,
  ];

  return (
    <div className="size-full flex overflow-auto">
      <div className="fixed h-full w-[300px] bg-green-900 text-white p-4">
        <div className="text-md font-bold mb-4">Cadastro</div>
        <div className="flex flex-col gap-3 text-xs font-thin">
          {stepsLabel.map((label, index) => (
            <div
              data-step={stepsState[index]}
              key={label}
              className="flex gap-2 items-center data-[step=true]:font-bold"
            >
              {stepsState[index] ? (
                <CheckCircleIcon className="size-3" />
              ) : (
                <CircleIcon className="size-3" />
              )}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ml-[300px] size-full pl-10 pr-[300px] py-4">
        {/* Dados do animal */}
        <div className="flex flex-col flew-wrap gap-4 border-t border-gray-200 py-4">
          <div className={titleCva()}>Dados do animal</div>
          <div className={containerCva()}>
            <Label>Imagem</Label>
            <Input placeholder="Nome do animal" />
          </div>
          <div className={containerCva()}>
            <Label>Nome do animal</Label>
            <Input placeholder="Nome do animal" />
          </div>
          <div className={containerCva()}>
            <Label>Tipo de animal</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Cachorro</SelectItem>
                <SelectItem value="cat">Gato</SelectItem>
                <SelectItem value="bird">Pássaro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={containerCva()}>
            <Label>Observações</Label>
            <Textarea placeholder="Observações" />
          </div>
        </div>

        {/* Dados do responsavel */}
        <div className="flex flex-col gap-4 border-t border-gray-200 py-4">
          <div className={titleCva()}>Dados do responsável</div>
          <div className={containerCva()}>
            <Label>Nome do responsável</Label>
            <Input placeholder="Nome do responsável" />
          </div>
          <div className={containerCva()}>
            <Label>CPF</Label>
            <Input placeholder="CPF" />
          </div>
          <div className={containerCva()}>
            <Label>Telefone</Label>
            <Input placeholder="Telefone" />
          </div>
          <div className={containerCva()}>
            <Label>Email</Label>
            <Input placeholder="Email" />
          </div>
        </div>

        {/* Endereco */}
        <div className="flex flex-col gap-4  border-t border-gray-200 py-4">
          <div className={titleCva()}>Endereço</div>
          <div className={containerCva()}>
            <Label>CEP</Label>
            <Input placeholder="CEP" />
          </div>
          <div className={containerCva()}>
            <Label>Rua</Label>
            <Input placeholder="Rua" />
          </div>
          <div className={containerCva()}>
            <Label>Bairro</Label>
            <Input placeholder="Bairro" />
          </div>
          <div className="w-full flex gap-2">
            <div className={containerCva()}>
              <Label>Número</Label>
              <Input placeholder="Número" />
            </div>
            <div className={containerCva()}>
              <Label>Complemento</Label>
              <Input placeholder="Complemento" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatients;
