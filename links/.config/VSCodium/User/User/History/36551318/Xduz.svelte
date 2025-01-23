<script>
  import { Button } from '$lib/components';
	import { onMount } from 'svelte';

  let loading = $state(false);

  onMount(() => {
    setInterval(() => {
      loading = !loading;
    }, 1000);
  });
</script>

<Button class="w-fit" {loading}>Test</Button>
