<script lang="ts">
  import type { Page } from "$lib/pages";

  interface Props {
    page: Page
  }
  let { page } = $props();
  let breadCrumbs = $derived(page.slug ? page.slug.split('/') : []);

  $inspect(breadCrumbs)
</script>

<div class="flex flex-row items-center justify-between">
  
</div>
