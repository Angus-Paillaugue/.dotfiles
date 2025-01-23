<script lang="ts">
  import { type LogLevel } from "../../app.d";
  import type { ComponentProps } from "svelte";

  const { level }: { level: LogLevel; } = $props();
</script>
