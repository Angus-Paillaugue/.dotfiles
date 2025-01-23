<script lang="ts">
  import type { Heading } from "./TOC.svelte";

  interface Props {
    heading: Heading[];
  }
  const { heading }: Props = $state()
</script>
