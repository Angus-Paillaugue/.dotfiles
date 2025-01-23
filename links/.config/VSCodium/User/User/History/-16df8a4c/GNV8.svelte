<script lang="ts">
  import type { Conversation } from "$lib/server/db/ai";
  import { toast } from "$lib/stores";
  import { Input } from "$lib/components/ui/input/index.js";

  let { conversation }: { conversation: Conversation } = $props();

  let isEditing = $state<boolean>(false);
  let input = $state<HTMLInputElement | null>(null);

  async function saveConversation() {
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
      isEditing = false;
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    if(e.key === 'Enter' || e.key === 'Escape') {
      saveConversation();
    }
  }

  // Focus the input when editing
  $effect(() => {
    isEditing && input?.focus();
  });
</script>

{#if isEditing || conversation.title === ''}
  <Input placeholder="Conversation name" id="conversationName" bind:value={conversation.title} bind:ref={input} onkeyup={onKeyUp} onblur={() => {isEditing = false; saveConversation()}} />
{:else}
  <h1 class="text-2xl font-bold w-full" ondblclick={() => (isEditing = true)}>{conversation.title}</h1>
{/if}
