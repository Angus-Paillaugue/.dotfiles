<script lang="ts">
  import { init, type BuildingMessage, DEFAULT_CONFIG } from ".";
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Brain, Send , ChevronLeft, Settings, Trash2 } from 'lucide-svelte';
  import MessageComponent from './message.svelte';
  import { fade } from "svelte/transition";
  import AIInput from "./input.svelte";
  import type { Conversation } from "$lib/server/db/ai";
  import { Button } from "$lib/components/ui/button/index.js";
  import Title from "./title.svelte";
  import OpenAI from "openai";
  import { PUBLIC_OLLAMA_URL } from '$env/static/public';
  import { toast } from "$lib/stores";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  const openai = new OpenAI({
    baseURL: PUBLIC_OLLAMA_URL,
    apiKey: 'unused',
    dangerouslyAllowBrowser: true
  });

  let { conversation }: { conversation: Conversation } = $props();
  let messages: BuildingMessage[] = $state(conversation.messages);
  let message: string = $state('');
  let pullProgress: { completed: number; total: number } | null = $state(null);
  let isAIWriting = $state<boolean>(false);
  let messagesContainer: HTMLElement | null = $state(null);
  let settingsModalVisible = $state<boolean>(false);
  let isSavingConversation = $state<boolean>(false);

  async function saveLatestMessage() {
    if(messages.length === 0) return;
    const { content, error, role } = messages[messages.length - 1];
    const res = await fetch('/api/ai/createMessage', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, role, error, idConversation: conversation.id })
    });
    if(!res.ok) {
      toast.error('Error saving message');
    }
  }

  function scrollToBottom() {
    if(!messagesContainer) return;
    messagesContainer.scroll({
      top: messagesContainer.scrollHeight + 100,
      behavior: 'instant'
    });
  }

  async function askQuestion(e: SubmitEvent) {
    e.preventDefault();
    if(!message || isAIWriting || !messagesContainer) return;
    isAIWriting = true;
    messages.push({ content: message, role: 'user', error: null });
    message = '';
    saveLatestMessage();
    scrollToBottom();
    messages.push({ content: '', role: 'system', error: null });
    const completion = await openai.chat.completions.create({
      model: DEFAULT_CONFIG.model,
      messages: messages.slice(0, -1),
      stream: true,
      n: 1,
      modalities: ['text'],
    });
    let latestAIMessage = messages.at(-1);
    if(!latestAIMessage) return;
    scrollToBottom();
    for await (const chunk of completion) {
      const currentScroll = messagesContainer.scrollTop;
      const containerHeight = messagesContainer.scrollHeight - messagesContainer.clientHeight;
      const scrollBottomOffset = containerHeight - currentScroll;
      const triggerHeight = 30;
      if(scrollBottomOffset < triggerHeight) {
        scrollToBottom();
      }
      const hasError = chunk.choices[0].finish_reason !== null && chunk.choices[0].finish_reason !== 'stop';
      if(hasError) {
        latestAIMessage.error = 'Error in AI response';
        return;
      }
      latestAIMessage.content += chunk.choices[0].delta.content;
    }
    isAIWriting = false;
    saveLatestMessage();
  }

  async function saveConversation() {
    isSavingConversation = true;
    const res = await fetch('/api/ai/saveConversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({conversation})
    });
    isSavingConversation = false;
    if(!res.ok) {
      toast.error('Error saving conversation');
    }else {
      toast.success('Conversation saved');
      settingsModalVisible = false;
    }
  }

  onMount(async () => {
    if(!messagesContainer) return;
    scrollToBottom();
    const initRes = await init();
    if(!initRes) return;
    for await (const res of initRes) {
      if(res.completed && res.total)
      pullProgress = {
        completed: res.completed,
        total: res.total
      }
    }
    pullProgress = null;
  });
</script>

<!-- When loading the page for the first time, pull the model and display loading screen -->
{#if pullProgress}
  <div class="absolute inset-0 z-10 flex flex-row items-center justify-center bg-primary/50">
    <Card.Root class="max-w-screen-sm w-full">
      <Card.Header>
        <Card.Title class="flex flex-row items-center gap-2">
          <Brain class="size-6" />
          Setting up your personal AI ...
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <Progress value={(pullProgress.completed/pullProgress.total) * 100} />
        <p class="text-center mt-2">
          {((pullProgress.completed/pullProgress.total) * 100).toFixed(2)}%
        </p>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

 <!-- Edit conversation modal -->
<Dialog.Root bind:open={settingsModalVisible}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely suEdit conversation</Dialog.Title>
    </Dialog.Header>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <Label for="conversationName">Conversation name</Label>
        <Input id="conversationName" bind:value={conversation.title} />
      </div>

      <Button class="ml-auto" loading={isSavingConversation} disabled={isSavingConversation} onclick={saveConversation}>Save</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>

<div class="grow flex flex-col h-full w-full">
  <div class="flex flex-row items-center justify-between border-y border-border shrink-0 p-2 gap-4">
    <Button href="/app/ai" variant="outline" class="size-10 p-0">
      <ChevronLeft class="size-8" />
    </Button>
    <Title bind:conversation {saveConversation} />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="size-10 p-0 ml-auto">
        <Settings class="size-8" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.GroupHeading>Settings</DropdownMenu.GroupHeading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item variant="destructive" onclick={() => (settingsModalVisible = true)}>
            <Trash2 class="size-4"/>
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="flex flex-col grow h-full gap-2 overflow-y-auto no-scrollbar pb-2 p-2" bind:this={messagesContainer}>
    {#each messages as m}
      <div transition:fade={{ duration:300 }}>
        <MessageComponent message={m} />
      </div>
    {/each}
  </div>
  <form onsubmit={askQuestion} class="flex flex-row gap-2 p-2 bg-sidebar shrink-0">
    <AIInput bind:value={message} onsubmit={askQuestion} placeholder="Message OwnLogs's AI" />
    <Button type="submit" class="h-full" disabled={isAIWriting}>
      <Send class="size-full" />
    </Button>
  </form>
</div>
