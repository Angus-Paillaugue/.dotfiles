<script lang="ts">
  import type { PageData } from './$types';
  import ServiceStatus from '$lib/components/ServiceStatus.svelte';
  import * as Card from '$lib/components/ui/card';
  import Button from '$lib/components/ui/button/button.svelte';
  import { pageMetadata } from '$lib/stores';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex w-full flex-col">
  <div class="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Card.Root>
      <Card.Header>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
      </Card.Header>
      <Card.Content>

      </Card.Content>
    </Card.Root>
  </div>
</div>
