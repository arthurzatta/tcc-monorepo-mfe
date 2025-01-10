<script lang="ts">
  let { children }: any = $props();
</script>

<tr>
  {@render children?.()}
</tr>

<style>
  tr {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    color: black;
  }
</style>
