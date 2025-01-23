<script>
  import { setContext, getContext } from "svelte";
  const { children } = $props();
</script>

<button onclick={() => {setContext("dropdownOpen", !getContext("dropdownOpen"))}}>
  {@render children()}
</button>
