<script lang="ts">
  let { children }: any = $props();
</script>

<th>
  {@render children?.()}
</th>

<style>
  th {
    font:
      700 14px/1.5 "Open Sans",
      sans-serif;
  }
</style>
