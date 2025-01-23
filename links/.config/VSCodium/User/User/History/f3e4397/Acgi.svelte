<script>
    /** @type {import('./$types').PageData} */
    let { data } = $props();
    const {properties } = data;
    console.log(properties);

</script>

{#each properties as property}
  <a href="./properties/{property.id}" class="p-4 rounded-lg border">
    <h1>{property.property_name}</h1>
    <p>{property.domain_name}</p>
  </a>
{/each}
