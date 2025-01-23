<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

  interface MyProps {

  }

  let { checked = $bindable(false), ...restProps }: ( SvelteHTMLElements['input'] & MyProps ) = $props()
</script>

<input type="checkbox" bind:checked {...restProps} />
