<script lang="ts">
  let { children, ...props }: any = $props();
</script>

<tr {...props} >
  {@render children?.()}
</tr>

<style>
  tr {
    border-bottom: 1px solid #ddd;
    text-align: left;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  tr:last-child {
    border-bottom: none;
  }
</style>
