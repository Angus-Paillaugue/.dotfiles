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
    note: "",
    tip: "",
    important: "",
    warning: "",
    caution: "material-symbols:dangerous-outline-rounded",
  };

  const noteClasses = twMerge(baseClasses, typeClasses[type], className);
</script>
