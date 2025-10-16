<script lang="ts">
  import type { Action } from "svelte/action";
  import { Chart } from "../../../lib/chart";
  import { BG_COLORS, BORDER_COLORS } from "../../../utils/colors";
  import { months } from "../../../utils/date-time";

  let chart: Chart | null = null;
  let chartDataFirst = $state([65, 59, 80, 81, 56, 55, 40]);
  let chartDataSecond = $state([65, 59, 80, 81, 56, 55, 40].reverse());

  $effect(() => {
    window.addEventListener("update-dashboard-data", (e: any) => {
      console.log("mfe-dashboard:LineChart", e.detail);
      const data = e.detail.data.barChart;
      chartDataFirst = data.first;
      chartDataSecond = data.second;
    });
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
