<script lang="ts">
  import { Table } from "../../../lib/components/ui/table";

  $effect(() => {
    window.addEventListener("update-dashboard-data", (event: any) => {
      console.log("mfe-dashboard:ServicesTable ", event);
    });

    window.addEventListener("storage", (event) => {
      console.log("mfe-dashboard:ServicesTable:storage", event);
    });
  });
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Column 1</Table.Head>
      <Table.Head>Column 2</Table.Head>
      <Table.Head>Column 3</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Row 1, Column 1</Table.Cell>
      <Table.Cell>Row 1, Column 2</Table.Cell>
      <Table.Cell>Row 1, Column 3</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Row 2, Column 1</Table.Cell>
      <Table.Cell>Row 2, Column 2</Table.Cell>
      <Table.Cell>Row 2, Column 3</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Row 3, Column 1</Table.Cell>
      <Table.Cell>Row 3, Column 2</Table.Cell>
      <Table.Cell>Row 3, Column 3</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
