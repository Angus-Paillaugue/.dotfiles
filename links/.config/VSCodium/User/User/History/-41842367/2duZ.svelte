<script lang="ts">
  import { Terminal } from "./Terminal.svelte";
  import { TextReveal } from "./TextReveal.svelte";

  const LETTER_SPACING = 9.6;
  let cursorPosition = $state({ top: 2, left: 0 });
  let terminalOutputElement = $state<HTMLDivElement | null>(null);
  let input = $state<HTMLInputElement | null>(null);

  const commands = {
    "socials": {
      description: "Displays a list of my social media profiles.",
      callback: () => {
        terminal.terminalPush("Social media profiles:");
        terminal.terminalPush("  [BG-RED]GitHub[/BG-RED]: <a href='https://github.com/Angus-Paillaugue' tabindex='-1' target='_blank'>@Angus-Paillaugue</a>");
        terminal.terminalPush("  [BG-BLUE]LinkedIn[/BG-BLUE]: <a href='https://www.linkedin.com/in/angus-paillaugue/' tabindex='-1' target='_blank'>@angus-paillaugue</a>");
      }
    },
    curl: {
      description: "Gets a file's content from a URL.",
      callback: (url: string) => {
        fetch(url)
          .then(response => response.text())
          .then(data => terminal.terminalPush(data))
          .catch(error => terminal.terminalPush(`Error: ${error}`));
      }
    },
  }

  const terminal = new Terminal(commands);

  $effect(() => {
    cursorPosition.top = 2;
    cursorPosition.left = (terminal.caretPosition * LETTER_SPACING) + (2 * LETTER_SPACING)
  });

  $effect(() => {
    if(!terminalOutputElement?.parentElement) return;
    terminalOutputElement.parentElement.scrollTop = terminal.terminalValue.length * 100;
  });
</script>

<svelte:window onclick={() => {input?.focus();}} />

<div class="w-full h-full grow p-4">
  <div class="text-neutral-100 ligatures-normal font-semibold tracking-normal border border-neutral-100 rounded-lg p-4 w-full h-full">
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
      <div class="whitespace-pre text-wrap font-mono text-base text-neutral-100 flex flex-row">
        <input onkeydown={terminal.handleInput} type="text" bind:this={input} bind:value={terminal.input} class="size-0 opacity-0 overflow-hidden bg-transparent outline-none" />
        {@html terminal.parseTerminalLine(terminal.prompt)} {terminal.input}
      </div>
      <!-- Cursor -->
      <div class="animate-[cursor_1s_linear_infinite] bg-neutral-100 absolute w-[2px] bottom-[2px] right-0" style="top: {cursorPosition.top}px; left: {cursorPosition.left}px;"></div>
    </div>
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
