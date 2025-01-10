import { mount as svelte } from "svelte";
import ServicesTable from "./ServicesTable.svelte";

const mount = (target: HTMLElement) => {
  if (!target) return;
  svelte(ServicesTable, { target });
};

export { mount };
