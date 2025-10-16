<script lang="ts">
  import { animalsList } from "../../../../../mocks/patients";
  import { Input, type FormInputEvent } from "../../../lib/components/ui/input";
  import Filter from "./Filter.svelte";

  type Animal = (typeof animalsList)[0];
  type FilterItem = { value: string; label: string };

  let value = $state();
  let filters = $state<FilterItem[]>([]);

  function dispatchSearchEvent() {
    const event = new CustomEvent("search-patients-name", {
      detail: { name: value },
    });
    window.dispatchEvent(event);
  }

  function dispatchClearEvent() {
    const event = new CustomEvent("search-patients-name", {
      detail: { name: "" },
    });
    window.dispatchEvent(event);
  }

  function onSubmit(e: FormInputEvent<KeyboardEvent>) {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatchSearchEvent();
    }
  }

  function onChange(e: FormInputEvent<Event>) {
    value = e.currentTarget.value;
    if (value === "") {
      dispatchClearEvent();
    }
  }

  const columns: Array<{
    value: keyof (typeof animalsList)[0];
    label: string;
  }> = [
    { value: "ownerName", label: "Responsável" },
    { value: "type", label: "Tipo" },
    { value: "lastDoctor", label: "Médico" },
  ];
  const tableValues = columns.reduce((acc, column) => {
    const columnSet = new Set<string>();
    const { value } = column;
    for (const animal of animalsList) {
      const animalValue = animal[value];
      const item = JSON.stringify({ value: animalValue, label: animalValue });
      columnSet.add(item);
    }

    return {
      ...acc,
      [value]: Array.from(columnSet).map((item) => JSON.parse(item)),
    };
  }, {});

  function onApplyFilter(key: string, filterList: any) {
    const keyAsKey = key as keyof Animal;
    const filterName = columns.find((column) => column.value === key)
      ?.label as string;

    for (const filter of filterList as FilterItem[]) {
      filters.push({ value: filter.label, label: filterName });
    }

    const animals = [];

    for (const filter of filterList) {
      const { value } = filter;
      animals.push(
        ...animalsList.filter((animal) => animal[keyAsKey] === value)
      );
    }

    window.dispatchEvent(
      new CustomEvent("filter-patients", {
        detail: {
          value: animals,
        },
      })
    );
  }
</script>

<div>
  <div class="flex justify-between items-center">
    <div class="flex flex-col gap-3">
      <Filter {columns} {tableValues} onApply={onApplyFilter} />
    </div>
    <div class="flex">
      <Input
        type="text"
        placeholder="Search"
        on:keydown={onSubmit}
        on:input={onChange}
      />
    </div>
  </div>
  {#if filters.length > 0}
    <div class="flex gap-3 mt-3">
      {#each filters as filter}
        <div
          class="flex gap-2 px-2 py-1 rounded-md bg-gray-200 text-xs font-medium items-center"
        >
          <div>{filter.label}: {filter.value}</div>
          <div>X</div>
        </div>
      {/each}
    </div>
  {/if}
</div>
