<script>
  import { newToast } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import { createHighlighter } from 'shiki'
  import { codeBlockTheme } from "$conf";

  const { commands } = $props();

  let selectedIndex = $state(0);
  let underlineElement = $state();
  const highlighter = createHighlighter({
		themes: [codeBlockTheme],
		langs: ['bash'],
	})


  $effect(() => {
    const selectedItem = document.querySelector('ul > li:nth-child(' + (selectedIndex + 1) + ')');
    const left = selectedItem.offsetLeft;
    const width = selectedItem.offsetWidth;

    underlineElement.style.left = left + 'px';
    underlineElement.style.width = width + 'px';
  });
</script>

<div class="w-full">
  <div class="relative h-fit w-full">
    <ul
      class="flex flex-row overflow-x-auto no-scrollbar flex-nowrap gap-2 border-b-2 border-neutral-300 dark:border-neutral-800 mb-2 relative"
    >
      {#each commands as command, i}
        <li class="mb-0 list-none">
          <button
            onclick={() => (selectedIndex = i)}
            class="px-4 py-2 relative overflow-visible cursor-pointer flex flex-row gap-2 items-center text-lg font-bold"
          >
            {command.name}
          </button>
        </li>
      {/each}
    </ul>
    <span
      class="absolute h-[2px] bottom-0 bg-primary-700 dark:bg-primary-300 transition-all"
      bind:this={underlineElement}
    ></span>
  </div>

  <div class="border border-neutral-300 dark:border-neutral-800 rounded-md overflow-hidden">
    <div class="flex flex-row gap-2 px-4 py-2">
      <div class="size-3 bg-neutral-300 dark:bg-neutral-800 rounded-full"></div>
      <div class="size-3 bg-neutral-300 dark:bg-neutral-800 rounded-full"></div>
      <div class="size-3 bg-neutral-300 dark:bg-neutral-800 rounded-full"></div>
    </div>
    <div
      class="text-neutral-300 relative commands"
    >
      {#await highlighter then highlighter}
        {@html
          highlighter.codeToHtml(commands[selectedIndex].command, {
            theme: codeBlockTheme,
            lang: 'bash'
          })
        }
      {/await}

      <!-- Copy command button -->
      <button
        tabindex="0"
        class="h-[2.5rem] bg-neutral-950 text-white rounded-full flex items-center justify-center transition hover:scale-105 active:scale-90 focus:outline-primary-200 p-1 aspect-square absolute top-1/2 right-2 -translate-y-1/2"
        onclick={(e) => {
          const copyButton = e.target.closest('button');
          copyButton.querySelector('.copy').classList.add('hidden');
          copyButton.querySelector('.copied').classList.remove('hidden');
          const textToCopy = copyButton.parentElement.querySelector('code').innerText;
          // Write the code to clipboard
          navigator.clipboard.writeText(textToCopy);
          // Show toast
          newToast({
            title: 'Copied to clipboard',
            message: 'The code has been copied to your clipboard',
            type: 'green'
          });
          setTimeout(() => {
            // Reset the button icon back to default
            copyButton.querySelector('.copy').classList.remove('hidden');
            copyButton.querySelector('.copied').classList.add('hidden');
          }, 2000);
        }}
      >
        <Icon icon="material-symbols:content-copy-outline-rounded" class="w-6 h-6 copy" />
        <Icon icon="material-symbols:check-rounded" class="w-6 h-6 copied hidden" />
      </button>
    </div>
  </div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copy" viewBox="0 0 24 24"><path fill="currentColor" dd="M9.116 17q-.691 0-1.153-.462T7.5 15.385V4.615q0-.69.463-1.153T9.116 3h7.769q.69 0 1.153.462t.462 1.153v10.77q0 .69-.462 1.152T16.884 17zm0-1h7.769q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T16.884 4H9.116q-.231 0-.424.192t-.192.423v10.77q0 .23.192.423t.423.192m-3 4q-.69 0-1.153-.462T4.5 18.385V7.115q0-.213.143-.356T5 6.616t.357.143t.143.357v11.269q0 .23.192.423t.423.192h8.27q.213 0 .356.143t.143.357t-.143.357t-.357.143zM8.5 16V4z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copied hidden" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 15.88l8.802-8.801q.146-.146.344-.156t.363.156t.166.357t-.165.356l-8.944 8.95q-.243.243-.566.243t-.566-.243l-4.05-4.05q-.146-.146-.152-.347t.158-.366t.357-.165t.357.165z"></path></svg>
