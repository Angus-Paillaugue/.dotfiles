<script>
  import { cn } from '$lib/utils';

  const { children, class: className } = $props();
  let isDragging = $state(false);

  function handleMouseDown(e) {
    e.target.style.cursor = 'grabbing';
    isDragging = true;
  }

  function handleMouseMove(e) {
    if(!isDragging) return;

    e.target.style.cursor = 'grabbing';
    e.target.scrollLeft -= e.movementX;
  }

  function handleMouseUp(e) {
    e.target.style.cursor = 'grab';
    isDragging = false;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={cn("flex flex-row gap-4 flex-no-wrap overflow-x-auto no-scrollbar", className)} onmousedown={handleMouseDown} onmousemove={handleMouseMove} onmouseup={handleMouseUp}>
  {@render children()}
</div>
