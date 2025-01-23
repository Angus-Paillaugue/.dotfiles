<script>


  const features = [
    {
      title: " Powerful Features",
      description: "Powerful features to help you manage and understand your logs better",
    }
  ]

</script>

<div class="grid" style="height: calc(100svh * {features.length} - 4rem);">

  {#each features as {title, description}}
    <div class="h-svh grid grid-cols-2">
      <!-- Text -->
      <div class="w-full flex flex-col sticky top-24 h-fit">
        {title}
        {description}
      </div>

      <!-- Image -->
    </div>
  {/each}
</div>
