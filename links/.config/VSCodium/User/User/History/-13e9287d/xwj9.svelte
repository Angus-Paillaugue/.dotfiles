<script lang="ts">
  import { flip } from 'svelte/animate';
  import * as CardComponent from '$lib/components/ui/card/index.js';
  import { GripVertical } from 'lucide-svelte';
  import type { Card } from '$lib/server/db/dashboard';

  const dragDuration = 300;
  let { cards = $bindable([]), onSwap }: { cards: Card[]; onSwap?: (cards: Card[]) => void } =
    $props();
  let draggingCard: Card | null = $state(null);
  let animatingCards: Set<Card> = $state(new Set());

  function swapWith(card: Card): void {
    if (!draggingCard || draggingCard === card || animatingCards.has(card)) return;
    animatingCards.add(card);
    setTimeout(() => animatingCards.delete(card), dragDuration);
    const cardAIndex = cards.indexOf(draggingCard);
    const cardBIndex = cards.indexOf(card);
    cards[cardAIndex] = card;
    cards[cardBIndex] = draggingCard;
  }

  function onDragStart(card: Card): void {
    draggingCard = card;
  }
  function onDragEnd(): void {
    if (onSwap) onSwap(cards);
    draggingCard = null;
  }
</script>

<!-- <svelte:window ondrag={onDrag} /> -->

<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
  {#snippet DataCardComponent(card: Card)}
  {#if}
    <div class="w-full overflow-auto max-h-[500px]">
      <table>
        <thead>
          <tr>
            {#each Object.keys(card?.data?.[0] ?? []) as k}
              <th>{k}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each card?.data ?? [] as data}
            <tr>
              {#each Object.values(data) as v}
                <td>{v}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/snippet}

  {#snippet GraphCardComponent(card: Card)}
    <div>
      <pre>{JSON.stringify(card.config, null, 2)}</pre>
    </div>
  {/snippet}

  {#each cards as card (card.id)}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div animate:flip={{ duration: dragDuration }} ondragenter={() => swapWith(card)} ondragover={(e) => e.preventDefault()} style="grid-column: span {card.colSpan ?? 1} / span {card.colSpan ?? 1};">
      <CardComponent.Root class="group">
        <CardComponent.Header>
          <div class="flex flex-row">
            {#if card?.title}
              <CardComponent.Title>{card.title}</CardComponent.Title>
            {/if}
            <div class="flex ml-auto hover:cursor-move translate-x-full flex-col items-center justify-center w-4 h-6 rounded-sm border bg-border transition-opacity opacity-0 group-hover:opacity-100">
              <GripVertical class="size-2.5" />
            </div>
            <div
              draggable="true"
              ondragstart={() => onDragStart(card)}
              ondragend={onDragEnd}
              class="group-hover:z-10 w-4 h-6 -z-10"
            ></div>
          </div>
          {#if card?.description}
            <CardComponent.Description>{card.description}</CardComponent.Description>
          {/if}
        </CardComponent.Header>
        <CardComponent.Content>
          {#if typeof card === 'object' && 'data' in card}
            {@render DataCardComponent(card)}
          {:else if typeof card === 'object' && 'config' in card}
            {@render GraphCardComponent(card)}
          {/if}
        </CardComponent.Content>
      </CardComponent.Root>
    </div>
  {/each}
</div>
