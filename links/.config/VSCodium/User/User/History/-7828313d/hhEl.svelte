<script>
  import { newToast } from '$lib/stores';
  import { scale } from 'svelte/transition';
  import { cn } from '$lib/utils';

  const {
    children,
    class: className,
    name,
    copyCode = true,
    snippet = false,
    lineNumbers = false
  } = $props();
  let codeCopied = $state(false);
  let interval = $state();
  let codeContainer = $state();

  /**
   * Function to copy text.
   */
  function copyText() {
    // Change the button icon to a checkmark
    codeCopied = true;
    const textToCopy = codeContainer.querySelector('code').innerText;
    // Write the code to clipboard
    navigator.clipboard.writeText(textToCopy);
    // Show toast
    newToast({
      title: 'Copied to clipboard',
      message: 'The code has been copied to your clipboard',
      type: 'green'
    });
    if (interval) {
      clearTimeout(interval);
      interval = null;
    }
    interval = setTimeout(() => {
      // Reset the button icon back to default
      codeCopied = false;
    }, 2000);
  }
</script>

{#snippet copyCodeButton(absolute = true, snippet = false)}
  {#if copyCode !== 'false'}
    <button
      onclick={copyText}
      tabindex="0"
      class={cn(
        'flex items-center justify-center rounded-full p-2 text-neutral-600 dark:text-neutral-100',
        absolute
          ? 'absolute bottom-1 right-5 top-4 aspect-square'
          : !snippet && 'aspect-square h-full',
        snippet && 'max shrink-0 rounded-none bg-body dark:bg-neutral-900'
      )}
      name="Copy code"
      aria-label="Copy code"
    >
      {#if codeCopied}
        <div in:scale={{ start: 0.5 }}>
          <Icon icon="lucide:check" class="size-4" />
        </div>
      {:else}
        <div in:scale={{ start: 0.5 }}>
          <Icon icon="lucide:copy" class="size-4" />
        </div>
      {/if}
    </button>
  {/if}
{/snippet}

{#if snippet == 'true'}
  <div class="snippet" bind:this={codeContainer}>
    {@render children()}
    {@render copyCodeButton(false, true)}
  </div>
{:else}
  <div
    class={cn(
      'codeContainer relative my-4',
      lineNumbers == 'true' && 'line-numbers'
    )}
    bind:this={codeContainer}
  >
    {#if name}
      <div
        class="codeBlockName relative flex w-full flex-row items-center rounded-t-md border border-b-0 border-neutral-300 px-3 py-1.5"
      >
        <p
          class="m-0 flex flex-row items-center gap-2 text-base font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></g></svg>
          {name}
        </p>
        <div class="ml-auto">
          {@render copyCodeButton(false, false)}
        </div>
      </div>
    {/if}
    <div class={className}>
      {@render children()}
      {#if !name}
        {@render copyCodeButton(true, false)}
      {/if}
    </div>
  </div>
{/if}

<style>
  :global(.codeBlockName + div .shiki) {
    @apply !rounded-t-none;
  }
</style>
