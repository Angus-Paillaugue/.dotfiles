<script>
  import MainWindow from "./MainWindow.svelte";

  let window1Visible = $state("default");
  $inspect(window1Visible)
</script>

<MainWindow bind:visible={window1Visible} />

<div class="fixed bottom-2 left-1/2 -translate-x-1/2 bg-neutral-800/50 backdrop-blur-md border border-neutral-700/50 rounded-xl flex flex-row gap-2 p-2">
  <button>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Terminalicon2.png/240px-Terminalicon2.png" class="size-10" alt="">
  </button>
</div>
