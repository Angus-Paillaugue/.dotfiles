<script>
  import { cn } from '$lib/utils';

  let isLoaded = $state(false)
  const { src, alt, class: className, ...props } = $props();
</script>


<img onload={() => {isLoaded = true}} src={src} alt={alt} class={cn('object-cover', className)} {...props} />
