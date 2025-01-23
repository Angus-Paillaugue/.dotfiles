<script>
  import Icon from "@iconify/svelte";
  import { twMerge } from "tailwind-merge";

  const { type = "warning", class:className, children, style="custom", ...restProps } = $props();

  const baseClasses = {
    github:"border-l-2 p-2 pl-4 my-2",
    custom:"border p-2 rounded-md my-2",
  }
  const typeClasses = {
    github: {
      note: "border-blue-600",
      tip: "border-green-600",
      important: "border-indigo-600",
      warning: "border-amber-600",
      caution: "border-red-600",
    },
    custom: {
      note: "text-blue-600 border-blue-600 bg-",
      tip: "text-green-600 border-green-600",
      important: "text-indigo-600 border-indigo-600",
      warning: "text-amber-600 border-amber-600",
      caution: "text-red-600 border-red-600",
    },
  };
  const iconClasses = {
    github: {
      note: "text-blue-600",
      tip: "text-green-600",
      important: "text-indigo-600",
      warning: "text-amber-600",
      caution: "text-red-600",
    },
    custom: {
      note: "text-blue-600",
      tip: "text-green-600",
      important: "text-indigo-600",
      warning: "text-amber-600",
      caution: "text-red-600",
    },
  }

  // Same regardless of style
  const iconNames = {
    note: "material-symbols:info-outline-rounded",
    tip: "material-symbols:lightbulb-outline-rounded",
    important: "iconoir:message-alert",
    warning: "material-symbols:warning-outline-rounded",
    caution: "material-symbols:dangerous-outline-rounded",
  };
</script>

{#if !Object.keys(typeClasses).includes(style)}
  <p>Invalid note style. Should be either {Object.keys(typeClasses).map(el => `"${el}"`).join(", ")}</p>
{:else}
  {#if Object.keys(typeClasses[style]).includes(type)}
    <div class={twMerge(baseClasses[style], typeClasses[style][type], className)} {...restProps} role="alert">
      {#if style === "github"}
        <div class="flex flex-col gap-1">
          <div class="flex flex-row items-center gap-2 {iconClasses[style][type]}" >
            <Icon class="size-5" icon={iconNames[type]} />
            <span class="capitalize font-semibold">{type}</span>
          </div>
          <p class="m-0 text-neutral-700 dark:text-neutral-300">{@render children()}</p>
        </div>
      {:else if style === "custom"}
        <div class="flex flex-row items-center gap-2">
          <Icon class="size-5" icon={iconNames[type]} />
          <p class="m-0 text-neutral-700 dark:text-neutral-300">{@render children()}</p>
        </div>
      {/if}
    </div>
  {:else}
    <p>Invalid note type. Should be either {Object.keys(typeClasses[style]).map(el => `"${el}"`).join(", ")}</p>
  {/if}
{/if}
