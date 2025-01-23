<script lang="ts">
  import Chat from '$lib/ai/Chat.svelte';
  const { data } = $props();
  const user = data.user;

  let conversation = $state(data.conversation);
</script>

<Chat bind:conversation {user} />
