<script lang="ts">
  import {
    Chart,
    Colors,
    controllers,
    elements,
    plugins,
    scales,
  } from "./lib/chart";
  import ServicesTable from "./ui/modules/ServicesTable/ServicesTable.svelte";
  Chart.register(controllers, scales, plugins, elements, Colors);
</script>

<main>
  <ServicesTable />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
  }
</style>
