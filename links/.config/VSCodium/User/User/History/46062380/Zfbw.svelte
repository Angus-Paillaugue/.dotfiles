<script>
	import { onMount } from "svelte";

  let timer = new Date();

  onMount(() => {
    setInterval(() => {
      let newTimer = new Date();
      newTimer.setSeconds(newTimer.getSeconds() + 1);
      timer = newTimer
    }, 1000);
  })
</script>

<p>{timer.toLocaleString()}</p>
