<script lang="ts">
	import { Input, Checkbox, Button } from "$lib/components";
	import type { ListNoteItem } from "$lib/types";
	import { cn } from "$lib/utils";
	import { GripVertical, X } from "lucide-svelte";
	import { onDestroy } from "svelte";

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

  function handleTouchStart(event: TouchEvent) {
    initialY = event.touches[0].clientY;
    touchTimeout = setTimeout(() => {
      isDragging = true;
      event.preventDefault();
    }, 200);
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    event.preventDefault();
    currentY = event.touches[0].clientY;
    const elements = document.elementsFromPoint(event.touches[0].clientX, currentY);
    const dropTarget = elements.find(el => el.hasAttribute('data-note-item')) as HTMLElement;

    if (dropTarget && dropTarget.dataset.id !== item.id.toString()) {
      const prevTarget = document.querySelector('.before:w-1');
      prevTarget?.classList.remove('before:w-1');
      dropTarget.classList.add('before:w-1');
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    clearTimeout(touchTimeout);
    if (!isDragging) return;

    event.preventDefault();
    isDragging = false;

    const dropTarget = document.querySelector('.before:w-1') as HTMLElement;
    if (dropTarget && dropTarget.dataset.id !== item.id.toString() && drop) {
      drop({ draggedId: item.id.toString(), targetId: dropTarget.dataset.id! });
    }

    dropTarget?.classList.remove('before:w-1');
  }

  onDestroy(() => {
    clearTimeout(touchTimeout);
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
  class={cn("flex flex-row gap-1 group h-8 items-center relative  before:h-full before:bg-primary before:left-0 before:absolute before:w-0", isDragging ? 'opacity-50' : '' ,isDropTarget && 'before:w-1')}
  data-note-item
  data-id={item.id}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  <div class="md:w-0 h-full shrink-0 group-hover:w-8 flex flex-col items-center justify-center transition-all overflow-hidden">
    <button
      draggable="true"
      ondragstart={handleDragStart}
      ondragend={handleDragEnd}
      ontouchstart={handleTouchStart}
      ontouchmove={handleTouchMove}
      ontouchend={handleTouchEnd}
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
