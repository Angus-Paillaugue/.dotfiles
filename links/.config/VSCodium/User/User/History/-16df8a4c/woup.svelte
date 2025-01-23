<script lang="ts">
  import type { Conversation } from "$lib/server/db/ai";
  import { toast } from "$lib/stores";

  let { conversation }: { conversation: Conversation } = $props();

  let isEditing = $state<boolean>(false);

  async function saveConversation() {
    const res = await fetch('/api/ai/saveConversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(conversation)
    });
    if(!res.ok) {
      toast.error('Error saving conversation');
    }else {
      toast.success('Conversation saved');
    }
  }
</script>

<h1 class="text-2xl font-bold">{conversation.title}</h1>
