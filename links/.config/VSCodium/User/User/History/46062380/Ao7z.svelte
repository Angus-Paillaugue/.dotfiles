<script>
	import { onMount } from "svelte";

  let timer = new Date();
  let arr = ["test"]

  onMount(() => {
    setInterval(() => {
      let newTimer = new Date();
      newTimer.setSeconds(newTimer.getSeconds() + 1);
      timer = newTimer
    }, 1000);

    arr = [...arr, "test"]
  })
</script>

<p>{timer.toLocaleString()}</p>
