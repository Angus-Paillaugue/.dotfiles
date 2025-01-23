<script>
  import FileTree from "./FileTree.svelte";
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
    {file.name}
  {/if}
{/each}
