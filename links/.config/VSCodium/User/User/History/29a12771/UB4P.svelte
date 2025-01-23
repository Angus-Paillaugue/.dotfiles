<script>
  import FileTree from "./FileTree.svelte";
  import { activeFile } from "$lib/stores"

  const { files } = $props();
  console.log(files);

</script>

{#each files as file}
  {#if file?.children}
    <details>
      <summary>{file.name}</summary>
      <FileTree files={file.children} />
    </details>
  {:else}
    <button onclick={() => {
      activeFile.set(file.fullPath);
    }}>
      {file.name}
    </button>
  {/if}
{/each}
