<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

  interface Props {

  }

  const { class: className, children, ...restProps }: SvelteHTMLElements['button'] = $props();
</script>


{#if 'href' in restProps}
  <a class="button" {...restProps}>
    {children}
  </a>
{:else}
  <button class="button" {...restProps}>
    {children}
  </button>
{/if}
