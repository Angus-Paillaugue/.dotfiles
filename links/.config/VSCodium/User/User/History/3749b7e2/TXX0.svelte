<script>
  import Icon from '@iconify/svelte';
  import { navigating } from "$app/stores";
</script>


{#if $navigating}
  <div class="fixed inset-0 bg-body z-[55] dark:bg-body-dark flex flex-col items-center justify-center">
    <Icon icon="svg-spinners:90-ring-with-bg" class="size-12" />
  </div>
{/if}
