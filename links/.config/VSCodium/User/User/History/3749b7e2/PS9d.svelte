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
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
  let interval;

  function animateProgress() {
    interval = setInterval(() => {
      progress.set($progress + 1);
      if ($progress >= 100)
        clearInterval(interval);
    }, 50); // Adjust the speed as needed
  }

  $effect(() => {
    if($navigating)
      animateProgress();
  });

  beforeNavigate(() => {
    clearInterval(interval)
    progress.set(0);
  });

  afterNavigate(() => {
    clearInterval(interval)
    progress.set(100);
 });
</script>

{#if $navigating}
  <div class="w-screen top-0 left-0 right-0 fixed z-50">
    <div class="h-2 bg-primary-600" in:fly={{ y:'-100%' }} out:fly={{ y:'-100%', delay:5000 }} style={`width: ${$progress}%`}> </div>
  </div>
{/if}
