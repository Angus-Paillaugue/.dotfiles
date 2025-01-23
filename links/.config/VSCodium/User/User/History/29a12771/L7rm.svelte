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
      activeFile = file;
    }}>
      {file.name}
    </button>
  {/if}
{/each}
