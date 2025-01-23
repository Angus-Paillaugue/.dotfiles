<script>
  import { navigating } from "$app/stores";
</script>


{#if $navigating}
  <div class="fixed inset-0 bg-body z-[55] dark:bg-body-dark flex flex-col items-center justify-center text-black">
<svg width="24" height="24" viewBox="0 0 24 24" xmlns=" 7,0,0,0,10.14,1.16Z" class="spinner_ajPY"/></svg>
  </div>
{/if}
