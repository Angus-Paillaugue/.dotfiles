<script lang="ts">
  import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Draggable } from './Window';

  let { children, title, class: className, visible = $bindable(), ...props } = $props();

  let windowElement = $state();
  let windowInstance = $state();

  onMount(() => {
    windowInstance = new Draggable(windowElement);
    visible = windowInstance.visible;
  });

  // Update the visible prop when the window is closed or minimized
  $effect(() => {
    visible = windowInstance.visible;
  });
  // Set the window to the correct state when the visible prop changes
  $effect(() => {
    windowInstance.setState(visible);
  })
</script>

<div id={title+"Window"} class={cn("flex absolute flex-col rounded-lg overflow-hidden border transition-[scale,opacity] border-neutral-700/50", className)} bind:this={windowElement}>
  <div class="flex flex-row shrink-0 items-center w-full bg-neutral-800 p-2 gap-2 titleBar">
    <div class="size-4 rounded-full flex flex-col items-center bg-[#d62736] border border-[#d62032] text-[#9f1b29] hover:bg-[#f34e57] transition-all group justify-center closeBtn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </div>
    <div class="size-4 rounded-full flex flex-col items-center bg-[#fac537] border border-[#fac537] hover:border-[#db9c15] text-[#965911] transition-all group justify-center minimizeBtn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M5 12h14"/></svg>
    </div>
    <div class="size-4 rounded-full flex flex-col items-center bg-[#14c01e] border border-[#10c20c] text-[#097402] hover:bg-[#3aea49] transition-all group justify-center maximizeBtn">
      <svg viewBox="0 0 59.999996 60" version="1.1" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" xmlns:svg="http://www.w3.org/2000/svg" class="size-2 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M 0,0 V 43.632743 A 6.3672573,6.3672573 45 0 0 6.3672573,50 H 50 Z" transform="translate(0,10)" /><path d="M 0,0 V 43.632743 A 6.3672573,6.3672573 45 0 0 6.3672573,50 H 50 Z" transform="rotate(180,30,25)" /></svg>
    </div>
  </div>
  <div class="w-full flex flex-col grow overflow-y-auto p-2">
    {@render children()}
  </div>
</div>
