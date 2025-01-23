<script>
  import { cn } from "$lib/utils";

  const { label, href, children, class: className, ...restProps } = $props();
</script>

<a
  {href}
  class="decoration-dotted decoration-2 decoration-primary underline underline-offset-2 hocus:text-primary transition-colors inline-block font-medium"
  aria-label={label}
  {...restProps}
>
  {@render children()}

</a>
