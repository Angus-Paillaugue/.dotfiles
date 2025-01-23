<script>
  import { setContext } from 'svelte';
  import { accordion } from "$lib/utils";
  import { cn } from "$lib/utils";

  let { children, dropDownList, position = "bottom", class:className, ...restProps } = $props();
  let open = $state(false);

  function toggle() {
    open = !open;
  }

  setContext('dropdown', { toggle });

  const positionClasses = {
    top: 'bottom-full left-0',
    bottom: 'top-full left-0',
    left: 'right-full top-0',
    right: 'left-full top-0',
  };
</script>

<div class={cn("w-fit relative", className)}>
  {@render children()}

  <div class={cn("z-30 w-52 shadow absolute bg-neutral-200 dark:bg-neutral-900 rounded-md mt-1", positionClasses[position])} use:accordion={open}>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <ul
      tabindex="0"
      class="p-2 flex flex-col"
    >
      {@render dropDownList()}
    </ul>
  </div>
</div>
