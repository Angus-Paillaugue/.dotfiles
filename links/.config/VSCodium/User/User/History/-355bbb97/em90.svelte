<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";

  let cursor = $state();
  let extCirclePos = spring({ x: 0, y: 0, width:0, height:0 }, {
    stiffness: 0.1,
    damping: 0.25,
  });
  let extCirclePos2 = spring({ x: 0, y: 0, width:0, height:0 }, {
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
    const size = 24;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const hoveringActiveElement = e.target.closest('a, button');
    const width = hoveringActiveElement ? hoveringActiveElement.clientWidth : size;
    const height = hoveringActiveElement ? hoveringActiveElement.clientHeight : size;
    const rect = hoveringActiveElement?.getBoundingClientRect()
    const x = hoveringActiveElement ? rect.x : mouseX - size / 2;
    const y = hoveringActiveElement ? rect.y : mouseY - size / 2;
    extCirclePos.set({ x, y, width, height });

    // if(hoveringActiveElement) {
    //   cursor.classList.add(...'ring-2'.split(' '))
    // }else {
    //   cursor.classList.remove(...'ring-2'.split(' '))
    // }
  }
</script>


<div class="rounded-full fixed z-50 pointer-events-none transition-colors ring-black ring-2" style="top: {$extCirclePos.y}px; left:{$extCirclePos.x}px; width: {$extCirclePos.width}px; height: {$extCirclePos.height}px;" bind:this={cursor}></div>
