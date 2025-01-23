<script>
  import { getIcon } from 'material-file-icons';
  import { Tree } from '$lib/components';
  import Icon from '@iconify/svelte';

  const { tree, root = true, open = true } = $props();

  // A tree is an array of objects with the following structure:
  // [
  //   {
  //     name: string,
  //     children: array
  //   },
  // ]

  // A child is a string representing it's name or it can be an object with the following structure:
  // {
  //   name: string,
  //   highted: boolean,
  // }
</script>


<ul class="{root ? 'bg-[var(--inline-code-bg)] p-4 rounded-md' :
    'border-l-2 border-neutral-700 pl-4 ml-2'}">
  {#each tree as element}
    {#if element?.children}
      <!-- Is a directory -->
      <details open={open}>
        <summary class="flex flex-row gap-2 items-center cursor-pointer text-base font-bold text-neutral-100 hover:text-neutral-400 mt-1">
          <Icon icon="ri:folder-line" class="size-4 folder-close" />
          <Icon icon="ri:folder-2-line" class="size-4 folder-open" />
          {element.name}
        </summary>
        <Tree tree={element.children} root={false} />
      </details>
    {:else}
      <!-- Is a file -->
      <li class="list-none pl-2 m-0 mt-1 flex flex-row gap-2 items-center text-neutral-100 {element?.highted ? "bg-primary-700 rounded" : "hover:text-neutral-400"}">
        <div class="size-5">
          {@html getIcon(element).svg}
        </div>
        <span class="text-base">
          {element?.name || element}
        </span>
      </li>
    {/if}
     <!-- content here -->
  {/each}
</ul>


<style>
  :global(details[open] .folder-close) {
    display: none;
  }
  :global(details[open] .folder-open) {
    display: block;
  }

  :global(details .folder-close) {
    display: block;
  }
  :global(details .folder-open) {
    display: none;
  }
</style>
