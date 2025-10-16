<script lang="ts">
  import moment from "moment";
  import { animalsList } from "../../../../../mocks/patients";
  import { Table } from "../../../lib/components/ui/table";

  // export let onClickInPacient = (id: string) => console.log("clicked")

  const heads: Record<keyof (typeof animalsList)[0], string> = {
    id: "ID",
    name: "Nome",
    ownerName: "Responsável",
    phone: "Telefone",
    cpf: "CPF",
    type: "Animal",
    lastAppointment: "Última visita",
    lastDoctor: "Último médico",
    lastAppointmentType: "Último atendimento",
  };

  let patientsList = $state(animalsList);

  $effect(() => {
    window.addEventListener("search-patients-name", (e) => {
      const event = e as CustomEvent;
      const { name } = event.detail;
      patientsList = animalsList.filter((animal) =>
        animal.name.toLowerCase().includes(name.toLowerCase())
      );
    });

    window.addEventListener("filter-patients", (e) => {
      const event = e as CustomEvent;
      const values = event.detail.value as Array<(typeof animalsList)[0]>;
      patientsList = values;
    });
  });

  const handleRowClick = (animal: typeof animalsList[0]) => () => {
    const event = new CustomEvent('mfe-dashboard/patient-data', {
      detail: {
        animal: animal,
        // Você pode adicionar mais dados se necessário
        timestamp: new Date().toISOString()
      }
    });
    window.dispatchEvent(event);
  };

</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      {#each Object.keys(animalsList[0]) as key}
        <Table.Head>{heads[key as keyof (typeof animalsList)[0]]}</Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each patientsList as animal}
      <Table.Row onclick={handleRowClick(animal)}>
        {#each Object.entries(animal) as [key, value]}
          <Table.Cell>
            {#if key === "lastAppointment"}
              {moment(value).format("DD/MM/YYYY")}
            {:else}
              {value}
            {/if}
          </Table.Cell>
        {/each}
      </Table.Row>
    {/each}
  </Table.Body>
  <Table.Foot>
    <Table.Row>
      <Table.Cell colspan={Object.keys(animalsList[0]).length - 1}>
        Total: {patientsList.length}
      </Table.Cell>
      <Table.Cell>Pagination</Table.Cell>
    </Table.Row>
  </Table.Foot>
</Table.Root>
