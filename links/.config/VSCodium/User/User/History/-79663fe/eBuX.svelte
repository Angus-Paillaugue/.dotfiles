<script lang="ts">
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  let { placeholder, value = $bindable(''), ...restProps } = $props();

  function onKeyDown(e: KeyboardEvent) {
    const events = [
      ['Enter', !e.shiftKey, () => {
        console.log('Enter pressed');
        const form = e.target as HTMLFormElement;
        form.dispatchEvent(new Event('submit'));
      }]
    ]
    for (const [key, condition, action] of events) {
      if (e.key === key && condition) {
        e.preventDefault();
        action();
      }
    }
  }
</script>

<Textarea {placeholder} onkeydown={onKeyDown} bind:value {...restProps} />
