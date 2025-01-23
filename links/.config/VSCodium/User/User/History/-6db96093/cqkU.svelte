<script lang="ts">
	import { onMount } from "svelte";

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<h3 class="text-lg text-primary whitespace-nowrap w-full line-clamp-1">{title}</h3>
