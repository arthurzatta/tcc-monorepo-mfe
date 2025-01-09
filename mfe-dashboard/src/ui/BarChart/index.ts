import { mount as svelte } from "svelte";
import BarChart from "./BarChart.svelte";

const mount = (target: HTMLElement) => {
  if (!target) return;
  svelte(BarChart, { target });
};

export { mount };
