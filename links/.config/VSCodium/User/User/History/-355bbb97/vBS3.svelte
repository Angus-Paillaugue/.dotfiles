<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";

  let cursor = $state();
  let pos = spring({ x: 0, y: 0, width:0, height:0 }, {
    stiffness: 0.1,
    damping: 0.25,
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
    const rect = hoveringActiveElement?.getBoundingClientRect()
    const x = hoveringActiveElement ? rect.x : mouseX - size / 2;
    const y = hoveringActiveElement ? rect.y : mouseY - size / 2;
    pos.set({ x, y, width, height });

    if(hoveringActiveElement) {
      cursor.classList.add('border-black')
    }else {
      cursor.classList.remove('border-black')
    }
  }
</script>


<div class="rounded-full bg-primary fixed z-50 pointer-events-none transition-colors border-2 border-transparent" style="top: {$pos.y}px; left:{$pos.x}px; width: {$pos.width}px; height: {$pos.height}px;" bind:this={cursor}></div>
