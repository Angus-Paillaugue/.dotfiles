<script lang="ts">
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";

  let { placeholder, value = $bindable(''), ...restProps } = $props();

  function onKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === 'Enter' && !e.shiftKey) {
    }else if(e.keyCode > 47 && e.keyCode < 91){
      value += e.key;
      console.log(value)
    }
  }
</script>

<Textarea {placeholder} onkeydown={onKeyDown} bind:value {...restProps} />
