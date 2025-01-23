<script>
  import { setContext, getContext } from "svelte";
  const { children } = $props();

  let open = $state(getContext("dropdownOpen"))
</script>

<button onclick={() => {setContext("dropdownOpen", !open)}}>
  {@render children()}
</button>
