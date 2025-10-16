<script lang="ts">
  let { children }: any = $props();
</script>

<div class="table-root">
  <table>
    {@render children?.()}
  </table>
</div>

<style>
  .table-root {
    height: 50%;
    border-radius: 8px;
    overflow: auto
  }
  table {
    height: 100%;
    width: 100%;
    border-collapse: collapse;
  }
</style>
