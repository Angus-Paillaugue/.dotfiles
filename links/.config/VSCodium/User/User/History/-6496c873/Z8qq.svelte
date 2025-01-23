<script lang="ts">
  import { pageMetadata } from '$lib/stores';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { dashboards } = data;

  pageMetadata.set({
    title: 'Dashboards',
    description: 'Manage your dashboards',
    breadcrumbs: [{ name: 'Dashboards' }]
  });
</script>

<div class="flex w-full flex-col">
  <div class="p-4 sm:px-6 sm:py-0">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      {#each dashboards as dashboard}
        <Card.Root>
          <Card.Header>
            <Card.Title>{dashboard.title}</Card.Title>
            {#if dashboard.description}
              <Card.Description
                >{dashboard.description}</Card.Description
              >
            {/if}
          </Card.Header>
          <Card.Content class="space-y-8">
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  </div>
</div>
