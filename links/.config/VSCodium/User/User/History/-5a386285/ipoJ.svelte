<script>
  import Icon from "@iconify/svelte";

  const { type = "warning", class:className, children } = $props();

  const baseClasses = ""
  const typeClasses = {
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
    success: "bg-green-100 border-green-500 text-green-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  const iconNames = {
    warning: "mdi:alert",
    error: "mdi:close-circle",
    success: "mdi:check-circle",
    info: "mdi:information",
  };

  const noteClasses = twMerge(baseClasses, typeClasses[type], className);
</script>
