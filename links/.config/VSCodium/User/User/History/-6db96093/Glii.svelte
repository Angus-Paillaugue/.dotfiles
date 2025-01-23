<script lang="ts">
	import { onMount } from "svelte";

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
  let translateX = $state<number>(0);

  onMount(() => {
    const titleElement = document.querySelector('.title') as HTMLDivElement;
    const titleWidth = titleElement.clientWidth;
    const containerWidth = titleElement.parentElement.clientWidth;
    const overflow = titleWidth - containerWidth;
    if(overflow > 0) {
      const animation = titleElement.animate([
        { transform: `translateX(0)` },
        { transform: `translateX(-${overflow}px)` }
      ], {
        duration: overflow * 10,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'linear'
      });
    }
  });
</script>

<div class="max-w-full overflow-hidden">
  <h3 class="text-lg text-primary whitespace-nowrap w-full title">{title}</h3>
</div>
