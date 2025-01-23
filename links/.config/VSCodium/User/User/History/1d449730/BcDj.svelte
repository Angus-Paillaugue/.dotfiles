<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";
  import { afterNavigate } from "$app/navigation";

  const externalCircleSize = 36;
  const interiorCircleSize = 8;
  const allowedElements = "a:not([disabled]), button:not([disabled]), .cursorGrow";
  const offset = {
    x:8,
    y:4
  };

  let cursor = $state();
  let extCirclePos = spring({ x: 0, y:0, width:externalCircleSize, height:externalCircleSize }, {
    stiffness: 0.03,
    damping: 0.25,
  });
  let interiorCirclePos = spring({ x: -externalCircleSize, y: -externalCircleSize }, {
    stiffness: 0.3,
    damping: 0.35,
  });

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.onmouseenter = () => {
      console.log("enter");

      cursor.style.opacity = `1`
    };
    document.onmouseleave = () => cursor.style.opacity = `0`;

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.onmouseenter = null;
      document.onmouseleave = null;
    };
  });

  /**
   * Handles the mouse move event.
   *
   * @param {MouseEvent} e - The mouse event object.
   */
  function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const hoveringActiveElement = e.target.closest(allowedElements);
    const width = (hoveringActiveElement ? hoveringActiveElement.clientWidth + offset.x * 2 : externalCircleSize);
    const height = (hoveringActiveElement ? hoveringActiveElement.clientHeight + offset.y * 2 : externalCircleSize);
    const rect = hoveringActiveElement?.getBoundingClientRect();
    const x = (hoveringActiveElement ? rect.x - offset.x : mouseX - externalCircleSize / 2);
    const y = (hoveringActiveElement ? rect.y - offset.y : mouseY - externalCircleSize / 2);
    extCirclePos.set({ x, y, width, height });
    interiorCirclePos.set({ x: mouseX - interiorCircleSize / 2, y: mouseY - interiorCircleSize / 2 });
    cursor.innerHTML = hoveringActiveElement?.innerHTML || "";
  }

  // Reset the position and size of the large circle on navigation
  afterNavigate(() => {
    extCirclePos.set({ x:  $interiorCirclePos.x - externalCircleSize / 2 + interiorCircleSize / 2, y:$interiorCirclePos.y - externalCircleSize / 2 + interiorCircleSize /2, width:externalCircleSize, height:externalCircleSize });
    interiorCirclePos.set({ x: $interiorCirclePos.x, y:$interiorCirclePos.y, width: interiorCircleSize, height: interiorCircleSize });
  });
</script>

<div class="rounded-full fixed z-50 pointer-events-none transition-colors ring-black ring-0 backdrop-grayscale backdrop-invert max-lg:hidden flex flex-row gap-2 items-center text-white" style="top: {$extCirclePos.y}px; left:{$extCirclePos.x}px; width: {$extCirclePos.width}px; height: {$extCirclePos.height}px;" bind:this={cursor}></div>
<div class="rounded-full fixed z-50 pointer-events-none transition-colors ring-0 size-2 backdrop-invert max-lg:hidden" style="top: {$interiorCirclePos.y}px; left:{$interiorCirclePos.x}px;" ></div>

<style>
  :global(*) {
    @apply lg:cursor-none
  }
  :global(*:hover) {
    @apply lg:cursor-none
  }
</style>
