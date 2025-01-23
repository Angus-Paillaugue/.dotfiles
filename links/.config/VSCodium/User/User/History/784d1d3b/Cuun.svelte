<script>
  import { twMerge } from "tailwind-merge";
  const { children, class: className, href, type="normal", ...restProps } = $props();

  const baseClasses = "px-4 py-2 text-lg text-primary-950 block bg-primary-300 dark:bg-primary-700 dark:text-primary-100 rounded-md active:scale-95 transition-all font-medium";

  const typeClasses = {
    normal: "",
    square: "p-2",
    circle: "p-2 rounded-full",
    ghost: "bg-transparent dark:bg-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-700 text-neutral-950 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-700",
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
