<script>
  import { twMerge } from "tailwind-merge";
  const { children, class: className, href, type="normal", ...restProps } = $props();

  const baseClasses = "px-4 py-2 text-lg text-primary-950 block bg-primary-300 dark:bg-primary-700 dark:text-primary-100 rounded-md active:scale-95 transition-transform font-medium";

  const typeClasses = {
    normal: "",
    square: "p-2"
  }
</script>
{#if href}
  <a {href} class={twMerge(baseClasses, typeClasses[type], className)} {...restProps}>
    {@render children()}
  </a>
{:else}
  <button class={twMerge(baseClasses, typeClasses[type], className)} {...restProps}>
    {@render children()}
  </button>
{/if}
