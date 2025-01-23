<script>
  import Icon from "@iconify/svelte";
  import { twMerge } from "tailwind-merge";

  const { type = "warning", class:className, children } = $props();

  const baseClasses = "border-l-2 p-2 pl-4"
  const typeClasses = {
    note: "",
    tip: "",
    important: "",
    warning: "",
    caution: "",
  };

  const iconNames = {
    note: "material-symbols:info-outline-rounded",
    tip: "material-symbols:lightbulb-outline-rounded",
    important: "iconoir:message-alert",
    warning: "material-symbols:warning-outline-rounded",
    caution: "material-symbols:dangerous-outline-rounded",
  };

  const noteClasses = twMerge(baseClasses, typeClasses[type], className);
</script>


{#if Object.keys(typeClasses).includes(type)}
  <div class={noteClasses}>
    <div class="flex items-center">
      <div class="flex flex-row items-center gap-2">
        <Icon class="size-6" icon={iconNames[type]} />
      </div>
      <div>{@render children()}</div>
    </div>
  </div>
{:else}
  <p>Invalid type. Should be {Object.keys(typeClasses).map(el => `"${el}"`).join(", ")}</p>
{/if}
