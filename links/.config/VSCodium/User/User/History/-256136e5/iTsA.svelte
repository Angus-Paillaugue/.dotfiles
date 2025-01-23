<script>
  import { createHighlighter } from 'shiki';
  import { colors } from '$conf';
  import { Spinner, Note } from '$lib/components';
  import { spring } from 'svelte/motion';
  import { pre as Pre } from './markdown';
  import { cn } from '$lib/utils';
  import { registry } from '$lib/Demos';

  const { name, lang = 'svelte', code = true } = $props();

  const component = registry[name];

  let selectedIndex = $state(0);
  let commandsContainer = $state();
  let underlineWidth = spring(0, {
    stiffness: 0.1,
    damping: 0.25
  });
  let underlineCoords = spring(0, {
    stiffness: 0.1,
    damping: 0.25
  });

  const { codeBlockTheme } = colors;
  const highlighter = createHighlighter({
    themes: [codeBlockTheme],
    langs: [lang]
  });


  // Update the underline width and position based on the selected index
  $effect(() => {
    if (!commandsContainer) return;
    const selectedItem = commandsContainer.querySelector(
      'ul > li:nth-child(' + (selectedIndex + 1) + ')'
    );
    if (!selectedItem) return;
    const left = selectedItem.offsetLeft;
    const width = selectedItem.offsetWidth;

    $underlineCoords = left;
    $underlineWidth = width;
  });
</script>

{#if !component}
  <Note type="caution">Demo not found.</Note>
{:else}
  <div class="demo" bind:this={commandsContainer}>
    <!-- Select tabs -->
    {#if code}
      <div class="relative w-fit tabs">
        <span
          class="absolute bottom-0 h-[2px] bg-primary-600 dark:bg-primary-400"
          style="left: {$underlineCoords}px; width: {$underlineWidth}px;"
        ></span>
        <ul
          class="flex flex-row border border-b-0 rounded-t w-fit border-main py-2 dark:border-main-dark"
        >
          <li class="mb-0 list-none">
            <button
              name="Preview demo"
              onclick={() => (selectedIndex = 0)}
              class="lenis-prevent relative flex cursor-pointer list-none flex-row items-center gap-2 overflow-visible px-4 py-2 text-lg font-bold"
            >
              Preview
            </button>
          </li>
          <li class="mb-0 list-none">
            <button
              name="View code"
              onclick={() => (selectedIndex = 1)}
              class="lenis-prevent relative flex cursor-pointer list-none flex-row items-center gap-2 overflow-visible px-4 py-2 text-lg font-bold"
            >
              Code
            </button>
          </li>
        </ul>
        <div class="absolute left-0 right-0 bg-body dark:bg-body-dark -bottom-px h-px"></div>
      </div>
    {/if}

    <!-- Preview/Code -->
    <div class={cn("demoContainer rounded-xl border border-main dark:border-main-dark h-[20rem] overflow-y-auto lg:h-[28rem] lenis-prevent", code && 'rounded-tl-none')}>
        <!-- Preview -->
        <div
          class={cn("component-preview flex-col items-center justify-center min-h-full h-max p-4", selectedIndex === 0 ? 'flex' : 'hidden')}
        >
          {#await component?.component()}
            <div class="flex p-4 rounded bg-body dark:bg-body flex-row items-center justify-center gap-4">
              <Spinner class="size-8" />
              <p class="m-0">Loading...</p>
            </div>
          {:then Component}
            <Component />
          {:catch}
            <Note type="caution">Code not found.</Note>
          {/await}
        </div>

      <!-- Code -->
      {#if code}
        <Pre
          class={cn(selectedIndex === 1 ? 'block h-full rounded-tl-none' : 'hidden')}
        >
          {#await component?.raw()}
            <div class="flex w-full h-full flex-row items-center justify-center">
              <div class="flex flex-row gap-4 p-4 items-center">
                <Spinner class="size-8" />
                <p class="m-0">Loading...</p>
              </div>
            </div>
          {:then rawFile}
            <!-- Code block -->
            {#await highlighter then highlighter}
              {@html highlighter.codeToHtml(rawFile, {
                theme: codeBlockTheme,
                lang
              })}
            {/await}
          {:catch}
            <Note type="caution">Code not found.</Note>
          {/await}
        </Pre>
      {/if}
    </div>
  </div>
{/if}

<style>
  :global(.demoContainer > *) {
    margin: 0 !important;
  }

  :global(.component-preview > div > *:last-child) {
    margin-bottom: 0;
  }
  :global(.demoContainer pre) {
    border-top-left-radius: 0;
  }
</style>
