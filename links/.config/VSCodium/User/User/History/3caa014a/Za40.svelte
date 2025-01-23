<script>
  const { children } = $props();
</script>

<li class="pl-8 step relative mb-4 before:absolute before:top-0 before:left-0 before:w-4 before:h-4 before:bg-primary-500 before:rounded-full">
  {@render children()}
</li>

<style>
  :global(li.step){
    counter-increment: steps-counter;
  }
  :global(li.step::before) {
    content: counter(steps-counter);
  }
</style>
