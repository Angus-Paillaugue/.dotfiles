<script>
	import { onMount } from "svelte";
	import FileTree from "./FileTree.svelte";
  import { activeFile } from "$lib/stores.js"

  let files = $state([]);

  onMount(() => {
    fetchFiles()
  })

  async function fetchFiles() {
    const res = await fetch("/api/fs/ls");
    const data = await res.json();
    files = data.files;
  }

  async function fetchFileContents() {
    const res = await fetch(`/api/fs/read?path=${activeFile}`);
    const data = await res.json();
    console.log(data);
  }

  activeFile.subscribe((value) => {
    console.log(value)
  })
</script>

<div class="grid grid-cols-3">
  <div class="flex flex-col">
    <FileTree {files} />

  </div>

  <div class="col-span-2">

  </div>
</div>
