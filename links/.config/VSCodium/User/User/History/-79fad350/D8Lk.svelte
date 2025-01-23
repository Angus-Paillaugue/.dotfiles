<script lang="ts">
  import { cn } from '$lib/utils';
  import type { SvelteHTMLElements } from 'svelte/elements';

  interface MyProps {
    children?: () => any;
    class?: string;
    href?: string;
  }
  type AnchorProps = { href: string } & SvelteHTMLElements['a'];
  type ButtonProps = SvelteHTMLElements['button'];
  type Props = AnchorProps | ButtonProps;


  const { children, class: className, ...restProps }: (Props & MyProps) = $props() as 3 | ButtonProps;

  const classes = cn(
    'list-none py-2 font-medium transition-colors text-base px-4 flex flex-row items-center gap-2 hover:bg-secondary/50 -outline-offset-1 dropdown-item',
    className
  );
</script>

{#if 'href' in restProps}
  <a class={classes} href={restProps.href} {...(restProps as AnchorProps)}>
    {@render children?.()}
  </a>
{:else}
  <button class={classes} {...restProps}>
    {@render children?.()}
  </button>
{/if}
