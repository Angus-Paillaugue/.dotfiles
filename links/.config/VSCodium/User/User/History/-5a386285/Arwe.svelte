<script>
  import Icon from "@iconify/svelte";

  const { type = "warning", class:className, children } = $props();

  const baseClasses = "border-l-2"
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


<div class={noteClasses}>
  <div class="flex items-center">
    <Icon class="w-6 h-6 mr-2" icon={iconNames[type]} />
    <div>{children}</div>
  </div>
</div>
