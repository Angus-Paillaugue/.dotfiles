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
