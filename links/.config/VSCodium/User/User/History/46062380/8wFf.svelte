<script>
	import { onMount } from "svelte";

  let date = $state(0);

  onMount(() => {
    setInterval(() => {
      date++;
    }, 1000);
  })
</script>

{#key date}
  <h1>The time is {date}</h1>
{/key}
