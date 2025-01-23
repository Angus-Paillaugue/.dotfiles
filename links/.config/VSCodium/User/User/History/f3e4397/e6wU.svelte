<script>
    /** @type {import('./$types').PageData} */
    let { data } = $props();
    const {properties } = data;
    console.log(properties);

</script>

{#each properties as property}
    <a href="./properties/{property.id}">
        <h1>{property.name}</h1>
        <p>{property.value}</p>
    </a>
{/each}
