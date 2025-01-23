<script lang="ts">
  import { Container, MousePointer2, Loader, Power, Check, BadgeCheck } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fade, fly, scale, slide } from 'svelte/transition';

  interface callback {
    currentTimelineIndex: number;
    mousePointer: HTMLElement;
    actionsBehind: string[];
  }

  let mousePointer: HTMLElement | undefined = $state();
  let getStartedButton: HTMLElement | undefined = $state();
  let currentTimelineIndex = $state(0);
  let actionsBehind: string[] = $state([]);
  const delay = async(ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const possibleActions = [
    'Creating virtual environment...',
    'Installing dependencies...',
    'Building project...',
    'Starting server...',
    'Running tests...',
    'Deploying...',
    'Finishing up...'
  ]

  const DELAY_BETWEEN_ACTIONS = 1000;
  const mouseAnimationTimeline = [
    {
      callback: async({ mousePointer }: callback) => {
        mousePointer.style.top = '70%';
        mousePointer.style.left = '70%';
        mousePointer.style.opacity = '1';
        mousePointer.style.transform = 'scale(1)';
        await delay(DELAY_BETWEEN_ACTIONS);
      }
    },
    {
      callback: async({ mousePointer }: callback) => {
        mousePointer.style.top = '50%';
        mousePointer.style.left = '50%';
        await delay(DELAY_BETWEEN_ACTIONS);
      }
    },
    {
      callback: async({ mousePointer }: callback) => {
        mousePointer.style.top = '50%';
        mousePointer.style.left = '50%';
        mousePointer.style.transform = 'scale(0)';
        await delay(300);
        mousePointer.style.top = '70%';
        mousePointer.style.left = '70%';
      }
    },
    {
      callback: async({ actionsBehind }: callback) => {
        for(const action of possibleActions) {
          actionsBehind.unshift(action);
          await delay(DELAY_BETWEEN_ACTIONS);
        }
      }
    },
    {
      callback: async() => {
        actionsBehind = [];
        await delay(DELAY_BETWEEN_ACTIONS * 3);
      }
    }
  ];

  onMount(() => {

    const next = async() => {
      await mouseAnimationTimeline[currentTimelineIndex]?.callback?.({ currentTimelineIndex, mousePointer, actionsBehind } as callback);
      currentTimelineIndex = currentTimelineIndex >= mouseAnimationTimeline.length - 1 ? 0 : currentTimelineIndex + 1;
      next();
    }

    next();
  });
</script>

<div
  class="flex flex-col items-center justify-between gap-1 rounded-xl border border-border bg-secondary lg:col-span-2"
>
  <div class="relative w-full h-[400px] grow overflow-hidden">
    {#if currentTimelineIndex <= 3}
      <!-- Actions list -->
      <div class="absolute p-4 inset-0 flex flex-col gap-2 items-center overflow-y-hidden justify-start">
        {#each actionsBehind as action (action)}
          <div in:fly={{ y: '-100%', duration: 300 }} out:fade={{ duration: 300 }} animate:flip={{ duration: 300 }} class="p-4 border bg-background border-border text-primary text-md rounded-lg font-medium min-w-[300px] w-min">
            {action}
          </div>
        {/each}
      </div>
      <!-- Semi transparent bg -->
      <div class="absolute inset-0 bg-secondary/50"></div>
      <!-- Bottom mask -->
      <div
        class="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-b from-transparent to-secondary"
      ></div>

      <!-- Get started button -->
      <button transition:scale={{ start:0 }} class="absolute transition-all shadow-lg top-1/2 left-1/2 -translate-x-1/2 flex flex-row items-center -translate-y-1/2 bg-background border border-border text-primary px-4 py-2 text-lg font-semibold rounded-xl" bind:this={getStartedButton}>
        <div class="size-6 relative mr-2 ">
          {#if currentTimelineIndex === 3}
            <span in:scale={{ duration: 300, start: 0 }}>
              <Loader class="size-full absolute animate-spin" />
            </span>
          {:else if currentTimelineIndex === 4}
            <span in:scale={{ duration: 300, start: 0 }}>
              <Check class="size-full absolute text-green-600 stroke-2" />
            </span>
          {:else}
            <span in:scale={{ duration: 300, start: 0 }}>
              <Power class="size-full absolute stroke-2" />
            </span>
          {/if}
        </div>
        Get started
      </button>
    {:else}
      <div class="size-full flex flex-row items-center justify-center">
        <span in:scale={{ start:0, duration:400, delay:400 }} out:scale>
          <BadgeCheck class="size-16 text-green-600" />
        </span>
        <span in:slide={{ axis:'x', duration:400, delay: 800 }} out:scale class="text-2xl font-semibold ml-4 whitespace-nowrap">Deployed successfully</span>
      </div>
    {/if}
      <!-- Mouse cursor -->
    <div class="absolute transition-all size-10 group" style="opacity: 0;" bind:this={mousePointer}>
      <div class="size-full relative">
        <MousePointer2 class="fill-background text-primary transition-opacity absolute size-full" />
      </div>
    </div>
  </div>
  <div class="p-6 pt-0">
    <span class="text-base font-medium text-neutral-700">
      <Container class="inline size-[18px] align-middle" />
      Docker powered.
    </span>
    <span class="text-base text-neutral-500"
      >Deploy anywhere with our Docker containers. Simple setup, seamless scaling.</span
    >
  </div>
</div>
