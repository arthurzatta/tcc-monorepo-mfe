<script lang="ts">
  import BarChart from "./ui/BarChart/BarChart.svelte";
</script>

<main>
  <div class="card">
    <BarChart />
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .card {
    width: 400px;
    height: 900px;
  }
</style>
