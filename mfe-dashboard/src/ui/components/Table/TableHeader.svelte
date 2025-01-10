<script lang="ts">
  let { children }: any = $props();
</script>

<thead>
  {@render children?.()}
</thead>

<style>
  thead {
    background-color: #f2f2f2;
  }
</style>
