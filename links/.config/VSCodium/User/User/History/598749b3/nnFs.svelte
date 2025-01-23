<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { artist } = data;

  console.log(artist)
</script>
