<script>
  import Icon from "@iconify/svelte";
  import { twMerge } from "tailwind-merge";

  const { type = "warning", class:className, children, style="github", ...restProps } = $props();

  const baseClasses = {
    github:"border-l-2 p-2 pl-4",
    custom:"border p-2 rounded-md",
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
      note: "text-blue-600 border-blue-600",
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
  }

  const iconNames = {
    note: "material-symbols:info-outline-rounded",
    tip: "material-symbols:lightbulb-outline-rounded",
    important: "iconoir:message-alert",
    warning: "material-symbols:warning-outline-rounded",
    caution: "material-symbols:dangerous-outline-rounded",
  };

  const noteClasses = twMerge(baseClasses[style], typeClasses[style][type], className);
</script>


{#if Object.keys(typeClasses[style]).includes(type)}
  <div class={noteClasses} {...restProps} role="alert">
    <div class="flex flex-col gap-1">
      <div class="flex flex-row items-center gap-2 {iconClasses[style]}" >
        <Icon class="size-5" icon={iconNames[type]} />
        <span class="capitalize font-semibold">{type}</span>
      </div>
      <p class="m-0 text-neutral-700 dark:text-neutral-300">{@render children()}</p>
    </div>
  </div>
{:else}
  <p>Invalid note type. Should be either {Object.keys(typeClasses).map(el => `"${el}"`).join(", ")}</p>
{/if}
