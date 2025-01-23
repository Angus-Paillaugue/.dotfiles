<script lang="ts">
  import { type LogLevel } from "../../app.d";
  import type { ComponentProps } from "svelte";

  const { level }: ComponentProps<{ level: LogLevel }> = $props();
</script>
