<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";

  let cursor = $state();
  let pos = spring({ x: 0, y: 0 }, {
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
    pos.set({ x: mouseX - size / 2, y: mouseY - size / 2 });
    console.log(e.target.closest('a'));

    if(e.target.closest('a')) {
      cursor.classList.add('bg-black')
    }else {
      cursor.classList.remove('bg-black')
    }
  }
</script>


<div class="size-12 rounded-full bg-primary fixed z-50" style="top: {$pos.y}px; left:{$pos.x}px;" bind:this={cursor}></div>
