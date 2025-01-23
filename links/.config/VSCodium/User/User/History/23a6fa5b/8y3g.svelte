<script>
  import { twMerge } from 'tailwind-merge';
  import Icon from "@iconify/svelte"

  const { class: cLasslist, summary, children, open = false, ...restProps } = $props();
</script>


<details {open} {restProps} class="border border-neutral-300/50 dark:border-neutral-700/50 rounded-md bg-white dark:bg-neutral-950">
  <summary class={twMerge('cursor-pointer flex flex-row items-center items-between text-base font-semibold p-4', cLasslist)}>
    <span class="arrow transition-all">
      <Icon
        icon="material-symbols:arrow-right-rounded"
        class="size-8 transition-transform"
      />
    </span>
    {@html summary}
  </summary>
  <div class="p-4">
    {@render children()}
  </div>
</details>

<style>
  /* Dropdown arrow */
  details[open] .arrow {
    transform: rotate(90deg);
  }
  details .arrow {
    transform: rotate(0deg);
  }
</style>
