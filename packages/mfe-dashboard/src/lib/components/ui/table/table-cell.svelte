<script lang="ts">
  let { children, ...props }: any = $props();
</script>

<td {...props}>
  {@render children?.()}
</td>

<style>
    .table-cell {
    color:black;
    }
    td {
    font:
      400 14px/1.5 "Open Sans",
      sans-serif;
    padding: 8px;
    cursor: pointer;
    user-select: none;
  }
</style>
