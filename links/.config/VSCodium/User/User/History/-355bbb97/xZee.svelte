<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";

  let cursor = $state();
  let extCirclePos = spring({ x: 0, y: 0, width:0, height:0 }, {
    stiffness: 0.03,
    damping: 0.25,
  });
  let interiorCirclePos = spring({ x: 0, y: 0 }, {
    stiffness: 0.3,
    damping: 0.35,
  });

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  function handleMouseMove(e) {
    const externalCircleSize = 24;
    const interiorCircleSize = 4;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const hoveringActiveElement = e.target.closest('a, button');
    const width = hoveringActiveElement ? hoveringActiveElement.clientWidth : externalCircleSize;
    const height = hoveringActiveElement ? hoveringActiveElement.clientHeight : externalCircleSize;
    const rect = hoveringActiveElement?.getBoundingClientRect()
    const x = hoveringActiveElement ? rect.x : mouseX - externalCircleSize / 2;
    const y = hoveringActiveElement ? rect.y : mouseY - externalCircleSize / 2;
    extCirclePos.set({ x, y, width, height });
    interiorCirclePos.set({ x: mouseX - interiorCircleSize / 2, y: mouseY - interiorCircleSize / 2 });
  }
</script>


<div class="rounded-full fixed z-50 pointer-events-none transition-colors ring-black ring-2" style="top: {$extCirclePos.y}px; left:{$extCirclePos.x}px; width: {$extCirclePos.width}px; height: {$extCirclePos.height}px;" bind:this={cursor}></div>
<div class="rounded-full fixed z-50 pointer-events-none transition-colors bg-black size-1" style="top: {$interiorCirclePos.y}px; left:{$interiorCirclePos.x}px;" ></div>
