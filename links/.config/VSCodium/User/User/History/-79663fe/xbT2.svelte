<script lang="ts">
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  let { placeholder, value = $bindable(''), ...restProps } = $props();

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
          console.log('Enter pressed');
          const form = textarea.closest('form');
          if (form) form.submit();
        }
      }
    ];
    const scrollHeight = textarea.scrollHeight;
    console.log(scrollHeight);
    const MAX_HEIGHT = 16 * 4 + 12 * 2 + 2; // 4 lines (16px) + padding (12px top and bottom) + border (2px)
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

<Textarea class="resize-none min-h-fit h-auto text-base p-3" rows={1} {placeholder} onkeydown={onKeyDown} bind:value {...restProps} />
