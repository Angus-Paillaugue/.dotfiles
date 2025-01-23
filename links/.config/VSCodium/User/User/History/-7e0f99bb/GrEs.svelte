<script>
  import { setContext } from 'svelte';
  import { accordion } from "$lib/utils";

  let { children, dropDownList } = $props();
  let open = $state(false);

  function toggle() {
    open = !open;
  }

  setContext('dropdown', { toggle });
</script>

<div class="w-fit relative">
  {@render children()}

  <div class="z-30 w-52 shadow absolute top-full left-0 -translate-x-1/2 bg-neutral-200 dark:bg-neutral-900 rounded-md mt-1" use:accordion={open}>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <ul
      tabindex="0"
      class="p-2 flex flex-col"
    >
      {@render dropDownList()}
    </ul>
  </div>
</div>
