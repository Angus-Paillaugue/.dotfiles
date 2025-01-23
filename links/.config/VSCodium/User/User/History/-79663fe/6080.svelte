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
    const MAX_HEIGHT = 16 * 4; // 4 lines
    if (scrollHeight > MAX_HEIGHT) {
      textarea.style.height = `${MAX_HEIGHT}px`;
    } else {
      textarea.style.height = `${scrollHeight}px`;
    }
    for (const { key, condition, action } of events) {
      if (e.key === key && condition) {
        e.preventDefault();
        action();
      }
    }
  }
</script>

<Textarea class="resize-none min-h-fit h-auto text-base p-3" rows={1} {placeholder} onkeydown={onKeyDown} bind:value {...restProps} />
