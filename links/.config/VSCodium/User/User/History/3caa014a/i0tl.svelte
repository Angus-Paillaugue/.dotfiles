<script>
  const { children } = $props();
</script>

<li class="pl-10 step relative mb-4 before:absolute before:top-0 before:left-0 before:size-6 before:bg-neutral-100 before:dark:bg-neutral-900 before:text-text-body-dark dark:before:text-text-body-dark before:border before:border-main before:dark:border-main-dark before:flex before:flex-col before:justify-center before:items-center before:rounded-full">
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
