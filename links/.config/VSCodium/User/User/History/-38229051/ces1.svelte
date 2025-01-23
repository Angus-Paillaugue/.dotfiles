<script lang="ts">
  let element = $state<HTMLDivElement | null>(null);
  let visible = $state<boolean>(false);

  $effect(() => {
      if(!element) return;


    // Tu fait ce que tu veux avec l'élément
    setTimeout(() => {
      if(!element)
      element.classList.remove('size-[100px]');
      element.classList.add('size-[200px]');
    }, 0);
  })
</script>


<button onclick={() => (visible = !visible)}>Toggle element</button>

{#if visible}
  <div bind:this={element} class="size-[100px] bg-blue-600 transition-all"></div>
{/if}
