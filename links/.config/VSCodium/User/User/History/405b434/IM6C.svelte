<script>
  import { Terminal } from "./Terminal.svelte.js";
  import { TextReveal } from "./TextReveal.svelte.js";

  let cursorPosition = $state({ top: 2, left: 0 });
  const commands = {
    "socials": {
      description: "Displays a list of my social media profiles.",
      callback: () => {
        terminal.terminalPush("Social media profiles:");
        terminal.terminalPush("  [BG-BLUE]Twitter[/BG-BLUE]: <a href='/' tabindex='-1' target='_blank'>@joshuahunsche</a>");
        terminal.terminalPush("  [BG-RED]GitHub[/BG-RED]: @joshuahunsche");
        terminal.terminalPush("  [BG-PURPLE]LinkedIn[/BG-PURPLE]: @joshuahunsche");
      }
    }
  }

  const terminal = new Terminal(commands);

  $effect(() => {
    const LETTER_SPACING = 9.6;
    cursorPosition.top = 2;
    cursorPosition.left = (terminal.input.length * LETTER_SPACING) + (2 * LETTER_SPACING)
  })
</script>

<svelte:window onkeydown={(e) => terminal.handleInput(e)} />

<div class="h-screen w-screen overflow-y-auto flex flex-col text-neutral-100 p-2 ligatures-normal font-semibold tracking-normal">
  <div class="w-full text-base">
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

  <div id="prompt" class="font-mono text-base flex flex-row items-center relative">
    <pre class="flex whitespace-pre-wrap flex-row font-mono text-neutral-100">{@html terminal.parseTerminalLine(terminal.prompt)} {terminal.input}</pre>
    <!-- Cursor -->
    <div class="animate-[cursor_1s_linear_infinite] bg-neutral-100 absolute w-[2px] bottom-[2px] right-0" style="top: {cursorPosition.top}px; left: {cursorPosition.left}px;"></div>
  </div>
</div>

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
