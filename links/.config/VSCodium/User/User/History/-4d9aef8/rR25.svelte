<script lang="ts">
	import { Input, Checkbox, Button } from "$lib/components";
	import type { ListNoteItem } from "$lib/types";
	import { cn } from "$lib/utils";
	import { GripVertical, X } from "lucide-svelte";
	import { onDestroy, onMount } from "svelte";
	import { draggedItemId } from "./list-note-item";

	interface Props {
		item: ListNoteItem;
		deleteItem: (item: ListNoteItem) => void;
		save: () => void;
    drop?: (args: { draggedId: string; targetId: string }) => void;
	}

	let { item = $bindable(), deleteItem, save, drop }: Props = $props();

  let isDragging = $state(false);
  let isDropTarget = $state(false);
  let touchTimeout = $state<ReturnType<typeof setTimeout>>();
  let initialY = $state<number>();
  let currentY = $state<number>();
  let dragHandle = $state<HTMLElement>();

  function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    initialY = event.touches[0].clientY;
    touchTimeout = setTimeout(() => {
      isDragging = true;
      draggedItemId.set(item.id.toString());
    }, 200);
  }

  function handleTouchEnd(event: TouchEvent) {
    clearTimeout(touchTimeout);
    if (!isDragging) return;

    event.preventDefault();
    isDragging = false;

    const dropTarget = document.querySelector('.drop-target') as HTMLElement;
    if (dropTarget && dropTarget.dataset.id !== item.id.toString() && drop) {
      drop({
        draggedId: $draggedItemId!,
        targetId: dropTarget.dataset.id!
      });
    }

    draggedItemId.set(null);
    document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    event.preventDefault();
    currentY = event.touches[0].clientY;

    // Find potential drop target
    const elements = document.elementsFromPoint(event.touches[0].clientX, currentY);
    const dropTarget = elements.find(el => el.hasAttribute('data-note-item')) as HTMLElement;

    if (dropTarget && dropTarget.dataset.id !== item.id.toString()) {
      document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
      dropTarget.classList.add('drop-target');
    }
  }

  onMount(() => {
    // Add non-passive touch listeners
    dragHandle?.addEventListener('touchstart', handleTouchStart, { passive: false });
    dragHandle?.addEventListener('touchmove', handleTouchMove, { passive: false });
    dragHandle?.addEventListener('touchend', handleTouchEnd);

    return () => {
      dragHandle?.removeEventListener('touchstart', handleTouchStart);
      dragHandle?.removeEventListener('touchmove', handleTouchMove);
      dragHandle?.removeEventListener('touchend', handleTouchEnd);
    };
  });

  function handleDragStart(event: DragEvent) {
    isDragging = true;
    event.dataTransfer?.setData("text/plain", item.id.toString());
    event.dataTransfer!.effectAllowed = 'move';
  }

  function handleDragEnd() {
    isDragging = false;
    isDropTarget = false; // Ensure cleanup
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    const draggedId = event.dataTransfer?.getData("text/plain");
    // Only show drop indicator if not dragging over self
    isDropTarget = draggedId !== item.id.toString();
    event.dataTransfer!.dropEffect = 'move';
  }

  function handleDragLeave() {
    isDropTarget = false;
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    isDropTarget = false; // Reset before dispatch
    const draggedId = event.dataTransfer?.getData("text/plain");
    if (draggedId && draggedId !== item.id.toString() && drop) {
      drop({ draggedId, targetId: item.id.toString() });
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cn("flex flex-row gap-1 group h-8 items-center relative", isDragging ? 'opacity-50' : '' ,isDropTarget && 'before:absolute before:w-1 before:h-full before:bg-primary before:left-0')}
  data-note-item
  data-id={item.id}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  <div class="md:w-0 h-full shrink-0 group-hover:w-8 flex flex-col items-center justify-center transition-all overflow-hidden">
    <button
      draggable="true"
      bind:this={dragHandle}
      class="touch-none select-none"
      ondragstart={handleDragStart}
      ondragend={handleDragEnd}
    >
      <GripVertical class="size-5 cursor-move" />
    </button>
  </div>
	<Checkbox bind:checked={item.checked} id="noteCheckboxItem-{item.id}" onchange={save} />
	<Input bind:value={item.item} onValueChange={save} debounce={500} id="noteInputItem-{item.id}" />
  <Button variant={['icon', "danger"]} class="w-8 h-full p-2" aria-label="Delete item" onclick={() => deleteItem(item)}>
    <X class="size-full" />
  </Button>
</div>

<style>
  .drop-target::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 100%;
    background: var(--primary);
    left: 0;
  }
</style>
