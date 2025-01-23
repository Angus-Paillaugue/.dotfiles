<script lang="ts">
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  let { placeholder, value = $bindable(''), ...restProps } = $props();

  function onKeyDown(e: KeyboardEvent) {
    const events = [
      ['Enter', !e.shiftKey]
    ]
    for (const [key, condition] of events) {
      if (e.key === key && condition) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Enter pressed');
        const form = e.target as HTMLFormElement;
        form.dispatchEvent(new Event('submit'));
      }
    }
  }
</script>

<Textarea {placeholder} onkeydown={onKeyDown} bind:value {...restProps} />
