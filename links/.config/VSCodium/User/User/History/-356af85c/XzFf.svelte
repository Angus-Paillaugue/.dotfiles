<script lang="ts">
	import type { Song } from "$lib/types";
	import { cn } from "$lib/utils";
	import { AudioLines } from "lucide-svelte";
	import { onMount } from "svelte";

  interface Props {
    song: Song;
    isPlaying?: boolean;
    class?: string;
  }

  let { song, isPlaying = false, class: className, ...restProps } : Props = $props();
  let image = $state<string>('');

  onMount(() => {
    image = URL.createObjectURL(
      new Blob([song.cover.data], { type: song.cover.format })
    );

    return () => {
      URL.revokeObjectURL(image);
    }
  });
</script>

<div class={cn("relative size-full", className)} {...restProps}>
  <!-- Loader -->
  <div class="-z-10 oabsolute inset-0 bg-secondary animate-pulse"></div>

  <!-- Actual image -->
  <img src={image} class="size-full object-cover" alt="" />
  {#if isPlaying}
    <div class="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center p-2 @container">
      <div class="hidden @[100px]:flex flex-row justify-around items-center size-full gap-[2px]">
        <div class="bg-primary rounded-full w-[3px]" style="animation: height-animation 1.5s 0.5s ease-in-out infinite both;"></div>
        <div class="bg-primary rounded-full w-[3px]" style="animation: height-animation 1.8s 0.8s ease-in-out infinite both;"></div>
        <div class="bg-primary rounded-full w-[3px]" style="animation: height-animation 2s 1s ease-in-out infinite both;"></div>
        <div class="bg-primary rounded-full w-[3px]" style="animation: height-animation 1.6s 0.6s ease-in-out infinite both;"></div>
      </div>
    </div>
  {/if}
</div>

<style>

  @keyframes -global-height-animation {
    0%, 100% {
      height: 0;
    }
    50% {
      height: 100%;
    }
  }

</style>
