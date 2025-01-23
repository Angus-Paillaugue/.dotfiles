<script>
  import { setContext } from 'svelte';
  import { accordion } from "$lib/utils";
  import { cn } from "$lib/utils";

  let { children, dropDownList, position = "bottom", align = "center", class:className, ...restProps } = $props();
  let open = $state(false);

  function toggle() {
    open = !open;
  }

  setContext('dropdown', { toggle });

  const positionClasses = {
    top: {
      pos: 'bottom-full mb-2',
      align: {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
      }
    },
    bottom: {
      pos: 'top-full mt-2',
      align: {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
      }
    },
    left: {
      pos: 'right-full mr-2',
      align: {
        start: 'top-0',
        center: 'top-1/2 -translate-y-1/2',
        end: 'bottom-0',
      }
    },
    right: {
      pos: 'left-full ml-2',
      align: {
        start: 'top-0',
        center: 'top-1/2 -translate-y-1/2',
        end: 'bottom-0',
      }
    },
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

  <div class={cn("z-30 w-52 shadow absolute overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-md", positionClasses[position].pos, positionClasses[position].align[align])} use:accordion={open}>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <ul
      tabindex="0"
      class="flex flex-col"
    >
      {@render dropDownList()}
    </ul>
  </div>
</div>
