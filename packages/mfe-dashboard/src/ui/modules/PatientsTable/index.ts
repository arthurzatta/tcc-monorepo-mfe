import { mount as svelte } from "svelte";
import "../../../app.css";
import PatientsTable from "./PatientsTable.svelte";

type Options = {
  onClickInPatient: (patientId: string) => void;
};

const mount = (target: HTMLElement, options?: Options) => {
  if (!target) return;
  svelte(PatientsTable, { target, props: options || {} });
};

export { mount };
