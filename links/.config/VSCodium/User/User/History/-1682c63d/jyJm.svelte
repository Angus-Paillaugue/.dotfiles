<script>
	import { onMount } from "svelte";
	import FileTree from "./FileTree.svelte";
  import { activeFile } from "$lib/stores.js"

  let files = $state([]);
  let fileContents = $state("");

  onMount(() => {
    fetchFiles()
  })

  async function fetchFiles() {
    const res = await fetch("/api/fs/ls");
    const data = await res.json();
    files = data.files;
  }

  async function fetchFileContents(path) {
    const res = await fetch(`/api/fs/read?path=${path}`);
    const data = await res.json();
    console.log(data);
    fileContents = data.contents;
  }

  activeFile.subscribe((value) => {
    if(!value) return;
    fetchFileContents(value)
  })
</script>

<div class="grid grid-cols-3">
  <div class="flex flex-col">
    <FileTree {files} />

  </div>

  <div class="col-span-2">
<pre>
{fileContents}
</pre>
  </div>
</div>
