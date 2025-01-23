<script>
  import { cn } from '$lib/utils';

  const { children, class: className, ...restProps } = $props();
  let isDragging = $state(false);

  function handleMouseDown(e) {
    e.target.style.cursor = 'grabbing';
    isDragging = true;
  }

  function handleMouseMove(e) {
    if(!isDragging) return;

    e.preventDefault();
    const x = e.pageX - e.target.offsetLeft;
    const scroll = x - startX;
    e.target.scrollLeft = scrollLeft - scroll;
  }

  function handleMouseUp(e) {
    e.target.style.cursor = 'auto';
    isDragging = false;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={cn("flex flex-row gap-8 flex-no-wrap overflow-x-auto no-scrollbar", className)} onmousedown={handleMouseDown} onmousemove={handleMouseMove} onmouseup={handleMouseUp} {...restProps}>
  {@render children()}
</div>
