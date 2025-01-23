<script>
  import MainWindow from "./MainWindow.svelte";

  let window1Visible = $state("default");
  $inspect(window1Visible)
</script>

<MainWindow bind:visible={window1Visible} />

<div class="fixed bottom-2 left-1/2 -translate-x-1/2 bg-neutral-800/50 backdrop-blur-md border border-neutral-700/50 rounded-xl flex flex-row gap-2 p-2">
  <button class="relative">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Terminalicon2.png/240px-Terminalicon2.png" class="size-10" alt="">
    {#if window1Visible === "default"}
      <div class="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 w-2 h-2 rounded-full"></div>
    {/if}
  </button>
</div>
