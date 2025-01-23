<script lang="ts">
  interface Props {
    open: boolean;
    children: () => any;
  }
  let { open = $bindable(false), children }: Props = $props();
</script>

{#if open}
  <div class="fixed inset-0 bg-background/50 backdrop-blur-md"></div>

  <div class="fixed inset-0 flex justify-center items-center">
    <div class="bg-background rounded-lg relative p-4">
      {@render children()}
    </div>
  </div>
{/if}
