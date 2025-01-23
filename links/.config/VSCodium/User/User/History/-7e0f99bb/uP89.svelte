<script>
  import { setContext } from 'svelte';
  import { accordion } from "$lib/utils";
  import { cn } from "$lib/utils";

  let { children, dropDownList, position = "bottom", align = "left", class:className, ...restProps } = $props();
  let open = $state(false);

  function toggle() {
    open = !open;
  }

  setContext('dropdown', { toggle });

  const positionClasses = {
    top: 'bottom-full left-0',
    bottom: 'top-full left-0 mt-2',
    left: 'right-full top-0',
    right: 'left-full top-0',
  };

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  function onWindowClickHandler (event) {
    if (!event.target.closest('.dropdown')) {
      open = false;
    }
  }
</script>

<svelte:window onclick={onWindowClickHandler} />

<div class={cn("w-fit relative dropdown", className)} {...restProps}>
  {@render children()}

  <div class={cn("z-30 w-52 shadow absolute bg-neutral-100 dark:bg-neutral-900 rounded-md mt-1", positionClasses[position], alignClasses[align])} use:accordion={open}>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <ul
      tabindex="0"
      class="flex flex-col"
    >
      {@render dropDownList()}
    </ul>
  </div>
</div>
