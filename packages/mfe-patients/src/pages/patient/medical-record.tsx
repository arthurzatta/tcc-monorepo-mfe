import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { uuid } from "@/lib/utils";
import EditorJS from "@editorjs/editorjs";
import moment from "moment";

const EDITOR_JS_ID = "editorJs";

const NotesModal = () => {
  const getDateTimeNow = () => moment().format("DD/MM/YYYY - HH:mm:ss");

  const initializeEditor = (ref: HTMLDivElement | null) => {
    if (!ref) return;
    new EditorJS({
      holder: EDITOR_JS_ID,
      tools: {},
      inlineToolbar: false,
      placeholder: "Insira as informações do paciente aqui",
      autofocus: true,
      hideToolbar: true,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo atendimento</Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] h-[80%]">
        <DialogHeader>
          <DialogTitle>
            [{uuid().split("-")[0]}] Atendimento {getDateTimeNow()}
          </DialogTitle>
          <DialogDescription>Digite seu texto aqui</DialogDescription>
        </DialogHeader>
        <div
          id={EDITOR_JS_ID}
          className="w-full h-full px-8"
          ref={initializeEditor}
        ></div>
        <DialogFooter>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MedicalRecord = () => {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center bg-gray-100 rounded-t-md p-4">
        <Input name="search" />
        <NotesModal />
      </div>
      <table className="w-full border border-solid h-full">
        <thead>
          <tr>
            <th>Data</th>
            <th>Procedimento</th>
            <th>Profissional</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12/12/2021</td>
            <td>Consulta</td>
            <td>Fulano de Tal</td>
            <td>Observações</td>
          </tr>
          <tr>
            <td>12/12/2021</td>
            <td>Consulta</td>
            <td>Fulano de Tal</td>
            <td>Observações</td>
          </tr>
          <tr>
            <td>12/12/2021</td>
            <td>Consulta</td>
            <td>Fulano de Tal</td>
            <td>Observações</td>
          </tr>
          <tr>
            <td>12/12/2021</td>
            <td>Consulta</td>
            <td>Fulano de Tal</td>
            <td>Observações</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecord;
