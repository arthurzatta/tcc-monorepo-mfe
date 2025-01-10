<script lang="ts">
  let { children }: any = $props();
</script>

<td>
  {@render children?.()}
</td>

<style>
  td {
    font:
      400 14px/1.5 "Open Sans",
      sans-serif;
  }
</style>
