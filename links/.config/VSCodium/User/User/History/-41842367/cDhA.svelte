<script lang="ts">
  import { Terminal } from "./Terminal.svelte";
  import { TextReveal } from "./TextReveal.svelte";
  
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
        {@html terminal.parseTerminalLine(terminal.prompt)}
        <input onkeydown={(e) => terminal.handleInput(e)} type="text" bind:this={input} bind:value={terminal.input} class="ml-2 text-neutral-100 caret-neutral-100 bg-transparent outline-none" />
      </div>
    </div>
  </div>
</div>
