<script>
	import { onMount } from "svelte";
	import FileTree from "./FileTree.svelte";
  import { activeFile } from "$lib/stores.js"
  import {get} from 'svelte/store'

  let files = $state([]);
  let textarea = $state()

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
    textarea.value = data.contents;
  }

  async function saveFile() {
    console.log(textarea.value);
    const res = await fetch(`/api/fs/writeFile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: textarea.value,
        path: get(activeFile),
      }),
    });
    const data = await res.json();
  }

  activeFile.subscribe((value) => {
    if(!value) return;
    fetchFileContents(value);
  });
</script>

<div class="grid grid-cols-3">
  <div class="flex flex-col">
    <button onclick={saveFile}>SAVE</button>
    <FileTree {files} />

  </div>

  <div class="col-span-2">
    <textarea bind:this={textarea} class="w-full h-screen">
    </textarea>
  </div>
</div>
