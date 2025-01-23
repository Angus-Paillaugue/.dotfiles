<script>
    /** @type {import('./$types').PageData} */
    let { data } = $props();
    const {properties } = data;
    console.log(properties);

</script>

{#each properties as property}
  <a href="./properties/{property.id}" class="p-4 rounded-lg border flex flex-col gap-1 text-neutral-900">
    <h1>{property.property_name}</h1>
    <p>{property.domain_name}</p>
  </a>
{/each}
