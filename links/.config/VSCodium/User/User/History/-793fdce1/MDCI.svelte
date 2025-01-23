<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    children?: () => any;
  }
  let { children }: Props = $props();
  const baseClasses = "bg-background border border-border rounded-lg p-4 flex flex-row items-center gap-4";
</script>

<div class={// cni-[component] e.g. cni-button
import { Button } from '$lib/components/ui/button'

// cnx-[component] e.g. cnx-button
<Button> Submit </Button>
}>
  {@render children?.()}
</div>
