<script lang="ts">
  import {
    Chart,
    Colors,
    controllers,
    elements,
    plugins,
    scales,
  } from "./lib/chart";
  import PatientsTable from "./ui/modules/PatientsTable/PatientsTable.svelte";
  import PatientsTableFilter from "./ui/modules/PatientsTableFilter/PatientsTableFilter.svelte";
  Chart.register(controllers, scales, plugins, elements, Colors);
</script>

<main>
  <PatientsTableFilter />
  <PatientsTable />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    padding: 8px;
  }
</style>
