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
    ondrop?: (draggedId: string, targetId: string) => void;
	}

	let { item = $bindable(), deleteItem, save, ondrop }: Props = $props();

  // DND on mobile
  let touchTimeout = $state<ReturnType<typeof setTimeout>>();
  let initialY = $state<number>();
  let currentY = $state<number>();
  function handleTouchStart(event: TouchEvent) {
    // Prevent scrolling while dragging
    event.preventDefault();
    initialY = event.touches[0].clientY;
    touchTimeout = setTimeout(() => {
      isDragging = true;
    }, 200);
  }
  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    event.preventDefault();
    currentY = event.touches[0].clientY;

    // Find potential drop target
    const elements = document.elementsFromPoint(event.touches[0].clientX, currentY);
    const dropTarget = elements.find(el => el.hasAttribute('data-note-item')) as HTMLElement;

    if (dropTarget) {
      document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
      dropTarget.classList.add('drop-target');
    }
  }
  function handleTouchEnd(event: TouchEvent) {
    clearTimeout(touchTimeout);
    if (!isDragging) return;

    event.preventDefault();
    isDragging = false;

    const dropTarget = document.querySelector('.drop-target') as HTMLElement;
    if (dropTarget && ondrop) {
      ondrop(item.id.toString(), dropTarget.dataset.id!);
    }

    document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
  }
  onDestroy(() => {
    clearTimeout(touchTimeout);
  });


  // DND on desktop
  let isDragging = $state(false);
  function handleDragStart(event: DragEvent) {
    isDragging = true;
    event.dataTransfer?.setData("text/plain", item.id.toString());
    event.dataTransfer!.effectAllowed = 'move';
  }
  function handleDragEnd(event: DragEvent) {
    isDragging = false;
    (event.currentTarget as HTMLElement).classList.remove('drop-target'); // Ensure cleanup
  }
  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    const draggedId = event.dataTransfer?.getData("text/plain");
    // Only show drop indicator if not dragging over self
    let isDropTarget = draggedId !== item.id.toString();
    if (isDropTarget) {
      (event.currentTarget as HTMLElement).classList.add('drop-target');
    }
    event.dataTransfer!.dropEffect = 'move';
  }
  function handleDragLeave(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove('drop-target');
  }
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.remove('drop-target'); // Reset before dispatch
    const draggedId = event.dataTransfer?.getData("text/plain");
    if (draggedId && draggedId !== item.id.toString() && ondrop) {
      ondrop(draggedId, item.id.toString());
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cn("flex flex-row gap-1 group h-8 items-center relative before:absolute before:h-full before:bg-primary before:left-0", isDragging ? 'opacity-50' : '')}
  data-note-item
  data-id={item.id}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  <!-- Drag handle -->
  <div class="md:w-0 h-full shrink-0 group-hover:w-8 flex flex-col items-center justify-center transition-all overflow-hidden ease-in-out duration-300">
    <button
      draggable="true"
      class="touch-none select-none w-8"
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

<style>
  .drop-target::before {
    width: 4px;
  }
</style>
