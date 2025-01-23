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
      <div class="flex flex-row text-neutral-800">
        <div class="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
          <span class="text-neutral-500">{file.type === "directory" ? "D" : "F"}</span>
        </div>
        <div class="ml-2">
          <p>{file.name}</p>
        </div>
      </div>
    {/each}

  </div>

  <div class="col-span-2">

  </div>
</div>
