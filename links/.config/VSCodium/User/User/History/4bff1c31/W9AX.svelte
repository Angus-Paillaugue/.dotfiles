<script>
  import { Terminal } from "./Terminal.svelte.js";
  import { TextReveal } from "./TextReveal.svelte.js";
  import Window from "./Window.svelte";

  let { visible = $bindable() } = $props();
  let window = $state();
  const LETTER_SPACING = 9.6;
  const commands = {
    "socials": {
      description: "Displays a list of my social media profiles.",
      callback: () => {
        terminal.terminalPush("Social media profiles:");
        terminal.terminalPush("  [BG-RED]GitHub[/BG-RED]: <a href='https://github.com/Angus-Paillaugue' tabindex='-1' target='_blank'>@Angus-Paillaugue</a>");
        terminal.terminalPush("  [BG-BLUE]LinkedIn[/BG-BLUE]: <a href='https://www.linkedin.com/in/angus-paillaugue/' tabindex='-1' target='_blank'>@angus-paillaugue</a>");
      }
    }
  }
  const terminal = new Terminal(commands);
  let cursorPosition = $state({ top: 2, left: 0 });


  $effect(() => {
    cursorPosition.left = (terminal.caretPosition * LETTER_SPACING) + (2 * LETTER_SPACING)
  });

  $effect(() => {
    const terminalOutput = document.getElementById("terminalOutput").parentElement;
    terminalOutput.scrollTop = terminal.terminalValue.length * 100;
  });

  $effect(() => {
    if(visible === "closed") {
      window.closeWindow();
      terminal.resetTerminal(true);
    }else if(visible === "minimized") {
      window.minimizeWindow();
    }else if(visible === "maximized") {
      window.maximizeWindow();
    }else {
      window.openWindow();
    }
  });
</script>

<svelte:window onkeydown={(e) => terminal.handleInput(e)} onclick={() => {}} />

<Window bind:this={window} title="Terminal" class="text-neutral-100 ligatures-normal font-semibold tracking-normal">
  <div class="w-full text-base" id="terminalOutput">
    {#each terminal.terminalValue as line}
      {#if terminal.isCommand(line)}
        {@html terminal.parseTerminalLine(line)}
      {:else}
        {@const value = terminal.parseTerminalLine(line)}
        {@const reveal = new TextReveal({ text: value })}
        {@html reveal.value}
      {/if}
    {/each}
  </div>

  <!-- Prompt/Input -->
  <div class="relative">
    <div class="whitespace-pre text-wrap font-mono text-base text-neutral-100 flex flex-row">{@html terminal.parseTerminalLine(terminal.prompt)} {terminal.input}</div>
    <!-- Cursor -->
    <div class="animate-[cursor_1s_linear_infinite] bg-neutral-100 absolute w-[2px] bottom-[2px] right-0" style="top: {cursorPosition.top}px; left: {cursorPosition.left}px;"></div>
  </div>
</Window>
<style>
  @keyframes -global-cursor {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
</style>
