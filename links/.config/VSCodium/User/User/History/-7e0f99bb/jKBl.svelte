<script>
  import { setContext } from 'svelte';
  import { accordion } from "$lib/utils";
  import { cn } from "$lib/utils";

  let { open = $bindable(false), children, dropDownList, position = "bottom", align = "center", class:className, ...restProps } = $props();

  function toggle() {
    open = !open;
  }

  function onWindowClickHandler (event) {
    if (!event.target.closest('.dropdown')) {
      open = false;
    }
  }

  function onWindowKeydownHandler (event) {
    if (event.key === 'Escape') {
      open = false;
    }
  }

  setContext('dropdown', { open, toggle });

  $effect(() => {
    const dropdown = document.querySelector('.dropdown');
    const listElements = dropdown.querySelectorAll('dropdown-item');
    listElements.forEach((el) => {
      console.log(el, open ? 0 : -1);

      el.setAttribute("tabindex", open ? 0 : -1);
    });
  })

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
</script>

<svelte:window onclick={onWindowClickHandler} onkeydown={onWindowKeydownHandler} />

<div class={cn("w-fit relative dropdown", className)} {...restProps}>
  {@render children()}

  <div class={cn("z-30 w-52 shadow absolute overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-md", positionClasses[position].pos, positionClasses[position].align[align])} use:accordion={open}>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      class="flex flex-col"
    >
      {@render dropDownList()}
    </div>
  </div>
</div>
