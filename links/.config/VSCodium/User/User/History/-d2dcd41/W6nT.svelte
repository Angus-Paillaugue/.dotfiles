<script lang="ts">
  import Chat from "$lib/ai/Chat.svelte";
  const { data } = $props();
  const { conversation } = data;
</script>

<Chat {conversation} />
