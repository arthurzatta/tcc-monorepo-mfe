import { Button } from "@/components/ui/button";
import { History } from "history";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type PatientPageProps = { history: History };

const PatientPage: React.FC<PatientPageProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="size-full grid grid-flow-col grid-cols-8 gap-2">
      <aside className="h-full col-span-2 flex flex-col p-4 gap-4 rounded-md border-black border">
        {/* Image */}
        <div className="w-full h-48 rounded-3xl bg-black"></div>

        {/* Informations */}
        <div className="flex flex-col gap-2">
          <div className="font-bold text-xl">Tótó</div>
          <div className="font-bold text-sm">Informações</div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-xs">Tutor</div>
              <div className="font-bold text-xs">Fulano de Tal</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs">Idade</div>
              <div className="font-bold text-xs">12y</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs">Tipo</div>
              <div className="font-bold text-xs">Cão</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs">Castrado</div>
              <div className="font-bold text-xs">Sim</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs">Chip</div>
              {/* <div className="font-bold text-xs">Sim</div> */}
              <div className="font-bold text-xs">01231202390</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <Button>Mais informações</Button>
          <Button
            variant={"ghost"}
            onClick={() => navigate("/list", { replace: true })}
          >
            <ArrowLeftIcon />
            Voltar para pacientes
          </Button>
        </div>
      </aside>

      <main className="col-span-6 flex flex-col  rounded-md border-black border"></main>
    </div>
  );
};

export default PatientPage;
