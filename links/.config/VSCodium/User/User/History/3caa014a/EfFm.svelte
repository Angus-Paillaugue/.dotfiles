<script>
  const { children } = $props();
</script>

<li class="pl-10 step relative m-0 pb-4 before:absolute before:top-0 before:left-0 before:size-7 before:bg-neutral-100 before:dark:bg-neutral-950 before:text-text-body-dark dark:before:text-text-body before:border before:border-main before:dark:border-main-dark before:flex before:flex-col before:justify-center before:items-center before:rounded-full before:content-[counter(steps-counter)] after:w-0 after:border-l after:border-main after:dark:border-main-dark after:absolute after:left-[15px] after:top-10 after:bottom-2">
  {@render children()}
</li>

<style>
  :global(li.step){
    counter-increment: steps-counter;
  }
</style>
