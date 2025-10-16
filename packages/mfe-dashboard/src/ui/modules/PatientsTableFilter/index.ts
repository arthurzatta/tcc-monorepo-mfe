import { mount as svelte } from "svelte";
import "../../../app.css";
import PatientsTableFilter from "./PatientsTableFilter.svelte";

const mount = (target: HTMLElement) => {
  if (!target) return;
  svelte(PatientsTableFilter, { target });
};

export { mount };
