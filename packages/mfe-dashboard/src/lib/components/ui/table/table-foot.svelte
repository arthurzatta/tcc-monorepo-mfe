<script lang="ts">
  let { children }: any = $props();
</script>

<tfoot>
  {@render children?.()}
</tfoot>

<style>
  tfoot {
    font:
      700 14px/1.5 "Open Sans",
      sans-serif;
    padding: 8px;
    background-color: rgba(20, 83, 45, 0.8);
    color: rgb(255 255 255) !important;
  }
</style>
