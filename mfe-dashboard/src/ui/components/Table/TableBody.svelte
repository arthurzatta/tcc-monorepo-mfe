<script lang="ts">
  let { children }: any = $props();
</script>

<tbody>
  {@render children?.()}
</tbody>

<style>
  tbody {
    border: 1px solid #ddd;
  }
</style>
