<script>
  import { setContext, getContext } from "svelte";
  const { children } = $props();

  let open = $state(getContext("dropdownOpen"))
</script>

<button onclick={() => {open = !open}}>
  {@render children()}
</button>
