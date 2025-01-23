<!-- <script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let isLoading = $state();

  onMount(() => {
    setTimeout(() => {
      isLoading = false;
    }, 1000);
  });
</script>


{#if isLoading}
  <div class="fixed inset-0 bg-body z-[55] dark:bg-body-dark flex flex-col items-center justify-center">
    <Icon icon="svg-spinners:90-ring-with-bg" class="size-12" />
  </div>
{/if} -->


<script>
  import { navigating } from '$app/stores';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { fly } from 'svelte/transition';

  let progress = $state(0);
  let interval;
  let isNavigating = $state(false);
  let intervalDelay = $state(70);

  function animateProgress() {
    interval = setInterval(() => {
      progress += 1;
      if (progress >= 80) {
        // clearInterval(interval);
        intervalDelay = 150;
      }

    }, intervalDelay); // Adjust the speed as needed
  }

  $effect(() => {
    if($navigating) {
      progress = 0;
      isNavigating = true;
      animateProgress();
    }else {
      clearInterval(interval);
      progress = 100;
      setTimeout(() => {
        isNavigating = false;
      }, 1000);
    }
  });
</script>

{#if isNavigating}
  <div class="w-screen top-0 left-0 right-0 fixed z-50" transition:fly={{ y:'-100%' }}>
    <div class="h-2 bg-primary-600 transition-[width] duration-150" style={`width: ${progress}%`}> </div>
  </div>
{/if}
