<script lang="ts">
  let { children }: any = $props();
</script>

<div>
  <table>
    {@render children?.()}
  </table>
</div>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
</style>
