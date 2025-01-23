<script lang="ts">
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  let { placeholder, value = $bindable(''), onsubmit, ...restProps } = $props();

  function onKeyDown(e: KeyboardEvent) {
    if (!e.target) return;
    const textarea = e.target as HTMLTextAreaElement;
    interface Action {
      key: string;
      condition: boolean;
      action: (() => void);
    }
    const events: Action[] = [
      {
        key: 'Enter',
        condition: !e.shiftKey,
        action: () => {
          const form = textarea.closest('form');
          if (form) {
            onsubmit(new SubmitEvent());
          }
        }
      }
    ];
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight + 2; // 2px for border
    const MAX_HEIGHT = 24 * 4 + 12 * 2 + 2; // 4 lines (24px) + padding (12px top and bottom) + border (2px)
    const height = Math.min(scrollHeight, MAX_HEIGHT);
    textarea.style.height = `${height}px`;
    for (const { key, condition, action } of events) {
      if (e.key === key && condition) {
        e.preventDefault();
        action();
      }
    }
  }
</script>

<Textarea class="resize-none min-h-full transition-all text-base p-3 overflow-y-auto" rows={1} {placeholder} onkeyup={onKeyDown} bind:value {...restProps} />
