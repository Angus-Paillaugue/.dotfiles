<script lang="ts">
  let element = $state<HTMLDivElement | null>(null);
  let visible = $state<boolean>(false);

  $effect(() => {
    if(!element) return;

    // Tu fait ce que tu veux avec l'élément
    element.style.backgroundColor = 'red';
  })
</script>


<button onclick={() => (visible = !visible)}>Toggle element</button>

{#if visible}
  <div bind:this={element} class="size-[100px]"></div>
{/if}
