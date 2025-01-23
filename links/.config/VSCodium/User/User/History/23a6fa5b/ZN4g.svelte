<script>
  import { twMerge } from 'tailwind-merge';
  import Icon from "@iconify/svelte";
  import { accordion } from '$lib/utils';

  let { class: cLasslist, summary, children, open = $bindabfalse, ...restProps } = $props();
</script>


<button bind:open {restProps} class="border border-neutral-300/50 dark:border-neutral-700/50 rounded-md bg-white dark:bg-neutral-950 overflow-hidden">
  <summary class={twMerge('cursor-pointer flex flex-row items-center items-between text-base font-semibold p-2 hover:bg-neutral-200/50 transition-colors', cLasslist)}>
    <span class="arrow transition-all">
      <Icon
        icon="material-symbols:arrow-right-rounded"
        class="size-7 transition-transform"
      />
    </span>
    {@html summary}
  </summary>
</button>
<div class="p-4" use:accordion={open}>
  {@render children()}
</div>

<style>
  /* Dropdown arrow */
  details[open] .arrow {
    transform: rotate(90deg);
  }
  details .arrow {
    transform: rotate(0deg);
  }
</style>
