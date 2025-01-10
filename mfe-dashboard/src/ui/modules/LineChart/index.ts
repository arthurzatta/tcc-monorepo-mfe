import { mount as svelte } from "svelte";
import {
  Chart,
  Colors,
  controllers,
  elements,
  plugins,
  scales,
} from "../../../lib/chart";
import LineChart from "./LineChart.svelte";

Chart.register(controllers, scales, plugins, elements, Colors);

const mount = (target: HTMLElement) => {
  if (!target) return;
  svelte(LineChart, { target });
};

export { mount };
