<script>
	import { onMount } from "svelte";

  let date = $state(new Date());

  onMount(() => {
    setTimeout(() => {
      date.setSeconds(date.getSeconds() + 1);
    }, 1000);

    setTimeout(() => {
      date.setSeconds(date.getSeconds() + 1);
    }, 2000);
  })
</script>

{#key date}
  <h1>The time is {date}</h1>
{/key}
