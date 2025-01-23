<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";

  let cursor = $state();
  let pos = spring({ x: 0, y: 0, width:0, height:0 }, {
    stiffness: 0.4,
    damping: 0.4,
  });

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  function handleMouseMove(e) {
    const size = 48;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const hoveringActiveElement = e.target.closest('a, button');
    const width = hoveringActiveElement ? hoveringActiveElement.clientWidth : size;
    const height = hoveringActiveElement ? hoveringActiveElement.clientHeight : size;
    pos.set({ x: mouseX - size / 2, y: mouseY - size / 2, width, height });

    if(hoveringActiveElement) {
      cursor.classList.add('bg-black')
      cursor.classList.remove('bg-primary')
    }else {
      cursor.classList.remove('bg-black')
      cursor.classList.add('bg-primary')
    }
  }
</script>


<div class="rounded-full bg-primary fixed z-50 pointer-events-none transition-colors" style="top: {$pos.y}px; left:{$pos.x}px; width: {$pos.width}px; height: {$pos.height}px;" bind:this={cursor}></div>
