<script>
  import { twMerge } from "tailwind-merge";
  const { children, class: className, href, ...restProps } = $props();

  const baseClasses = "";
</script>
{#if href}
  <a {href} class={twMerge(baseClasses, className)} {...restprops}>
    {@render children()}
  </a>
{:else}
  <button class={twMerge(baseClasses, className)} {...restProps}>
    {@render children()}
  </button>
{/if}
