<script lang="ts">
  import type { Snippet } from "svelte";

  type CardProps = { children?: Snippet };

  let props: CardProps = $props();
</script>

<div>
  {@render props.children?.()}
</div>

<style>
  div {
    /* width: fit-content; */
    /* height: fit-content; */
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
