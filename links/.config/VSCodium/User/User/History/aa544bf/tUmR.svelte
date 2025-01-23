<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { MediaQuery } from "runed";

  let { log }: { log: Record<string, any> | null;} = $props();

  let isOpen: boolean = $state(false);

  $effect(() => {
    if (log) {
      isOpen = true;
    }else {
      isOpen = false;
      log = null;
    }
  });

  const isDesktop = new MediaQuery("(min-width: 768px)");
</script>

{#if isDesktop.matches}
  <Dialog.Root bind:open>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
      >Edit Profile</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>
      <form class="grid items-start gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input type="email" id="email" value="shadcn@example.com" />
        </div>
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" value="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <!-- On mobile -->
  <Drawer.Root bind:open={isOpen}>
    <Drawer.Content>
      <div class="mx-auto w-full max-w-screen-md">
        <Drawer.Header>
          <Drawer.Title>Log details</Drawer.Title>
        </Drawer.Header>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Key</Table.Head>
              <Table.Head>Value</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#if log}
              {#each Object.entries(log) as [key, value]}
                <Table.Row>
                  <Table.Cell class="font-medium">{key}</Table.Cell>
                  <Table.Cell>{value}</Table.Cell>
                </Table.Row>
              {/each}
            {/if}
          </Table.Body>
        </Table.Root>

        <Drawer.Footer>
          <Drawer.Close class={buttonVariants({ variant: 'default' })}>Close</Drawer.Close>
        </Drawer.Footer>
      </div>
    </Drawer.Content>
  </Drawer.Root>
{/if}
