<script lang="ts">
  import { Chart } from "chart.js";
  import type { Action } from "svelte/action";
  import { months } from "../../../utils/date-time";

  // const { data } = $props<{ data: number[] }>();

  let data = $state([65, 59, 80, 81, 56, 55, 40]);
  let chart: Chart | null = null;

  $effect(() => {
    window.addEventListener("update-dashboard-data", (e: any) => {
      console.log("mfe-dashboard:LineChart", e.detail);
      data = e.detail.data.lineChart;
    });
  });

  const createChart: Action<HTMLCanvasElement, number[]> = (node, data) => {
    function setupChart(_data: number[]) {
      const labels = months({ count: 7 });
      const data = {
        labels: labels,
        datasets: [
          {
            label: "My First Dataset",
            data: _data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      chart = new Chart(node, { type: "line", data });
    }
    setupChart(data);

    return {
      update: (data: number[]) => {
        chart?.destroy();
        setupChart(data);
      },
      destroy: () => {
        chart?.destroy();
      },
    };
  };
</script>

<canvas use:createChart={$state.snapshot(data)}></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
