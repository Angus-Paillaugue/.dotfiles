<script>
	import { onMount } from "svelte";


  const files = $state([]);

  onMount(() => {
    cons
  })

  async function fetchFiles() {
    const res = await fetch("/api/fs/ls?path");
    const data = await res.json();
    files.set(data);
  }

</script>
