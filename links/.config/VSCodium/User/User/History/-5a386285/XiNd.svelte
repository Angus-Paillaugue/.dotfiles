<script>
  import Icon from "@iconify/svelte";

  const { type = "warning", class:className, children } = $props();

  const baseClasses = ""
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
    important: "",
    warning: "material-symbols:warning-outline-rounded",
    caution: "material-symbols:dangerous-outline-rounded",
  };

  const noteClasses = twMerge(baseClasses, typeClasses[type], className);
</script>
