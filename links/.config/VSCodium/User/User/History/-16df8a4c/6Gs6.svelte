<script lang="ts">
  import type { Conversation } from "$lib/server/db/ai";
  import { toast } from "$lib/stores";
  import { Input } from "$lib/components/ui/input/index.js";

  let { conversation }: { conversation: Conversation } = $props();

  let isEditing = $state<boolean>(false);

  async function saveConversation() {
    console.log(conversation)
    const res = await fetch('/api/ai/saveConversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({conversation})
    });
    if(!res.ok) {
      toast.error('Error saving conversation');
    }else {
      toast.success('Conversation saved');
    }
  }
</script>

{#if isEditing || conversation.title === ''}
  <Input placeholder="Conversation name" bind:value={conversation.title} onblur={() => {isEditing = false; saveConversation()}} />
{:else}
  <h1 class="text-2xl font-bold" ondblclick={() => (isEditing = true)}>{conversation.title}</h1>
{/if}
