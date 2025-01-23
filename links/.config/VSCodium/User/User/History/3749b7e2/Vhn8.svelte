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

    let progress = $state(0);
    let interval;

    function animateProgress() {
        interval = setInterval(() => {
            progress += 1;
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200); // Adjust the speed as needed
    }

    $effect(() => {
      if($navigating)
        animateProgress();
    });


    beforeNavigate(() => {
      progress = 0;
    });

    afterNavigate(() => {
      progress = 100;
      clearInterval(interval)
    });
</script>

<div id="progress_bar" style={`width: ${progress}%`}> </div>


<style>
  #progress_bar {
    height: 4px;
    background-color: red;
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    transition: width 0.3s ease-in-out;
    z-index: 9999;
}
</style>
