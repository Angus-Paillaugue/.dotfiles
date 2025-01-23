<script>
  import { cn } from '$lib/utils';
  import MainWindow from "./MainWindow.svelte";

  let window1Visible = $state("default");
  $inspect(window1Visible)
</script>

<MainWindow bind:visible={window1Visible} />

<div class="fixed bottom-2 left-1/2 -translate-x-1/2 bg-neutral-800/50 backdrop-blur-md border border-neutral-700/50 rounded-2xl flex flex-row gap-2 p-3">
  <button class="relative" onclick={(() => {if(window1Visible === "closed" || window1Visible === "minimized") window1Visible = "default";})}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Terminalicon2.png/240px-Terminalicon2.png" class="size-10" alt="">
    <div class={cn("absolute top-full left-1/2 -translate-x-1/2 w-2 transition-all h-2 rounded-full", (window1Visible === "default" || window1Visible === "maximized") ? "bg-neutral-100" : window1Visible === "minimized" ? "bg-neutral-400" : "opacity-0")}></div>
  </button>
</div>
