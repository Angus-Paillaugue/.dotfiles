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

<div class="grid grid-cols-3">
  <div class="flex flex-col">
    {#each files as file}
      
    {/each}

  </div>

  <div class="col-span-2">

  </div>
</div>
