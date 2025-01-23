<script lang="ts">
	import { X } from "lucide-svelte";

  interface Props {
    open: boolean;
    children?: () => any;
  }
  let { open = $bindable(false), children }: Props = $props();
</script>

{#if open}
  <div class="fixed inset-0 bg-background/50 backdrop-blur-md z-50"></div>

  <div class="fixed inset-0 flex justify-center items-center z-50">
    <div class="bg-background rounded-lg relative p-4">
      <button class="p-1 rounded-md hover:bg-secondary"><X class="size-4" /></button>
      {@render children?.()}
    </div>
  </div>
{/if}
