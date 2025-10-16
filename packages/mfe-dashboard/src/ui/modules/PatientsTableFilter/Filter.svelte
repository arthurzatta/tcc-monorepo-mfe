<script lang="ts">
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { Button } from "../../../lib/components/ui/button";
  import * as Popover from "../../../lib/components/ui/popover";
  import * as Select from "../../../lib/components/ui/select";

  let open = $state(false);

  type FilterProps = {
    columns: { value: string; label: string }[];
    tableValues: Record<string, { value: string; label: string }[]>;
    onApply?: (key: string, args: any) => void;
  };

  let props: FilterProps = $props();

  let selected = $state({ value: "", label: "" });
  let valuesSelected = $state([]);

  function closeAndApplyFilter() {
    open = false;
    props.onApply?.(selected.value, valuesSelected);
    selected = { value: "", label: "" };
    valuesSelected = [];
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[350px] justify-between"
    >
      Filtro
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[350px] p-3 space-y-3">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="">Coluna da tabela</label>
      <Select.Root bind:selected>
        <Select.Trigger>
          <Select.Value placeholder="Selecione uma coluna" />
        </Select.Trigger>
        <Select.Content>
          {#each props.columns as column}
            <Select.Item value={column.value}>{column.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="">Valor</label>
      <Select.Root
        disabled={selected.value.length === 0}
        multiple
        bind:selected={valuesSelected}
      >
        <Select.Trigger>
          <Select.Value placeholder="Selecione um valor" />
        </Select.Trigger>
        <Select.Content>
          {#each props.tableValues[selected.value] as tableValue}
            <Select.Item value={tableValue.value}>
              {tableValue.label}
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <Button
      variant="default"
      class="w-full"
      on:click={() => closeAndApplyFilter()}
    >
      Aplicar
    </Button>
  </Popover.Content>
</Popover.Root>
