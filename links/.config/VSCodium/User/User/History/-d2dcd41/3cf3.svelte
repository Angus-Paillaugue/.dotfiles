<script lang="ts">
  import Chat from '$lib/ai/Chat.svelte';
  import type { Conversation } from '$lib/server/db/ai.js';
  const { data } = $props();
  const user = data.user;

  let conversation = $state<Conversation>(data.conversation);
</script>

<Chat bind:conversation {user} />
