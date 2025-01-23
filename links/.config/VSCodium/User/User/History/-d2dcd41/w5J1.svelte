<script lang="ts">
  import Chat from '$lib/ai/Chat.svelte';
  const { data } = $props();
  const user = data.user;

  let conversation = $state<Conversation>(data.conversation);
</script>

<Chat bind:conversation {user} />
