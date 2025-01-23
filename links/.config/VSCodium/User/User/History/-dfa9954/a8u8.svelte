<script>
  import { SEO, Card } from '$lib/components';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
  const { outfits } = data;
</script>

<SEO title="Outfits" description="Your outfits" />

<div class="grow grid grid-cols-1 mg:grid-cols-2">
  {#each outfits.items as outfit}
    <Card href="/app/outfits/{outfit.id}">
      <h1>{outfit.name}</h1>
      <div class="grid grid-cols-2">
        {#each outfit.elements as item}
          <img src={item.image} alt={item.name} class="size-full object-cover rounded-lg" />
        {/each}
      </div>
    </Card>
  {/each}
</div>
