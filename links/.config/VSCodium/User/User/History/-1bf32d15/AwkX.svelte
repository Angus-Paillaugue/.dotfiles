<script>
  import { cn } from "$lib/utils";

  const { label, href, children, class: className, icon = true, ...restProps } = $props();
</script>

<a
  {href}
  class="decoration-dotted decoration-2 decoration-primary underline underline-offset-2 hocus:text-primary transition-colors inline-block font-medium"
  aria-label={label}
  {...restProps}
>
  {@render children()}
  {#if icon}
    <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-black" viewBox="0 0 24 24">
			<path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 7h10v10M7 17L17 7"
			/>
		</svg>
  {/if}
</a>
