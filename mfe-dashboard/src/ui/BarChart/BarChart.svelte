<script lang="ts">
  import type { Action } from "svelte/action";
  import {
    Chart,
    Colors,
    controllers,
    elements,
    plugins,
    scales,
  } from "../../lib/chart";
  import { BG_COLORS, BORDER_COLORS } from "../../utils/colors";
  import { months } from "../../utils/date-time";

  Chart.register(controllers, scales, plugins, elements, Colors);
  let chart: Chart | null = null;
  let chartDataFirst = $state([65, 59, 80, 81, 56, 55, 40]);
  let chartDataSecond = $state([65, 59, 80, 81, 56, 55, 40].reverse());

  $effect(() => {
    const interval = setInterval(() => {
      chartDataFirst = chartDataFirst.map((v) => v + Math.random() * 10);
      chartDataSecond = chartDataSecond.map((v) => v + Math.random() * 10);
    }, 5000);

    return () => clearInterval(interval);
  });

  const createChart: Action<
    HTMLCanvasElement,
    { first: number[]; second: number[] }
  > = (node, data) => {
    const setupChart = (_data: { first: number[]; second: number[] }) => {
      if (!node) return;
      const labels = months({ count: 7 });
      const backgroundColor = Object.values(BG_COLORS);
      const borderColor = Object.values(BORDER_COLORS);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "My First Dataset",
            data: _data.first,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
          {
            label: "My Second Dataset",
            data: _data.second,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
        ],
      };
      chart = new Chart(node, { type: "bar", data });
    };
    setupChart(data);

    return {
      update: (data) => {
        chart?.destroy();
        setupChart(data);
      },
      destroy: () => chart?.destroy(),
    };
  };
</script>

<canvas
  class="chart"
  use:createChart={{
    first: $state.snapshot(chartDataFirst),
    second: $state.snapshot(chartDataSecond),
  }}
></canvas>

<style>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
