<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

  interface MyProps {

  }

  type Props = MyProps & (
    { href: string } & SvelteHTMLElements['a'] |
    SvelteHTMLElements['button']
  )

  const { class: className, children, ...restProps }: Props = $props();
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
