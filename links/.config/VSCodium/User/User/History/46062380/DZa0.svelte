<script>
	import { onMount } from "svelte";

  let timer = new Date();
  let arr = ["test"]

  onMount(() => {
    setInterval(() => {
      let newTimer = new Date();
      newTimer.setSeconds(newTimer.getSeconds() + 1);
      timer = newTimer
      arr.push("test2")
    }, 1000);

  })
</script>

<p>{timer.toLocaleString()}</p>
{#each arr as el}
  <p>{el}</p>

{/each}
