<script>
	import { onMount } from "svelte";


  let files = $state([]);

  onMount(() => {
    fetchFiles()
  })

  async function fetchFiles() {
    const res = await fetch("/api/fs/ls");
    const data = await res.json();
    files = data.files;
  }

  $inspect(files);

</script>
