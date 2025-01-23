<script>
  import { SEO, Card, ColorCircles, Button, Input, Spinner } from '$lib/components';
  import { getImageUrl } from '$lib/utils';
  import { Book, Link, Pencil, Upload } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { enhance } from '$app/forms';
  import { FastAverageColor } from 'fast-average-color';
	import {removeBackground} from "@imgly/background-removal"
  import { color as colorRegistry, type as typeRegistry } from '$lib/constants';
  import { toast } from '$lib/components/Toast';

  /** @type {import('./$types').PageData} */
  let { data, form } = $props();
  let { item } = data;

  let editItemModalVisible = $state(true);
  let editedItem = $state({ ...item });
  let isLoadingNewImage = $state(false);

  $effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});


  /**
	 * Handles the image upload.
	 * @returns {Promise<void>}
	 */
	async function handleImageUpload(removeBg = false) {
		isLoadingNewImage = true;
		editedItem.image = removeBg ? await removeBgImage(editedItem.image) : editedItem.image;
    console.log(editedItem.image);

		const url = URL.createObjectURL(editedItem.image);
		const img = document.createElement('img');
		img.src = url;
		img.classList.add('invisible');
		img.id = 'averageColorImg';
		document.body.appendChild(img);
		const averageColor = await getAverageColor(img);
		isLoadingNewImage = false;
		if (editedItem.color.length === 0) editedItem.color = [findNearestColorName(averageColor)];
		// URL.revokeObjectURL(url);
	}

	/**
	 * Removes the background image for a given file.
	 *
	 * @param {string} file - The file to remove the background image from.
	 * @returns {Promise<void>} - A promise that resolves when the background image is successfully removed.
	 */
	async function removeBgImage(file) {
    return await removeBackground(file);
	}

	/**
	 * Calculates the average color of an image.
	 *
	 * @param {HTMLImageElement} img - The image element to calculate the average color from.
	 * @returns {string} The average color in hexadecimal format.
	 */
	async function getAverageColor(img) {
		const fac = new FastAverageColor();
		const { hex } = await fac.getColorAsync(img);
		return hex;
	}
</script>

<SEO title={editedItem.name} description={editedItem.name} />

<!-- Responsible for closing the edit item modal on <kbd>`Escape`</kbd> key press -->
<svelte:window onkeydown={(e) => {if(e.key === "Escape")editItemModalVisible = false}} />

{#if editItemModalVisible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed bg-neutral-950/50 backdrop-blur-sm inset-0 z-30" transition:fade onclick={() => (editItemModalVisible = false)}></div>
  <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-md w-full z-40" transition:fly={{ y:'100%' }}>
    <Card>
      <form
				use:enhance={(e) => {
					// Setting the input values in the formData manually
					// This is caused by the fact that the <Select /> inputs
					// Are to really inputs but rather buttons, so we need
					// to set their values manually
					for (const [k, v] of Object.entries(editedItem)) {
						if (v instanceof Array) {
							for (const value of v) {
								e.formData.append(`${k}[]`, value);
							}
						} else {
							e.formData.append(k, v);
						}
					}
					return async ({ update }) => {
						// Removes the default behavior of the form being reset after submission
						update({ reset: false });
					};
				}}
				method="POST"
				action="?/save"
				enctype="multipart/form-data"
				class="flex flex-col gap-4"
			>
        <h2>Edit {editedItem.name}</h2>

        <!-- Name -->
        <Input label="Name" id="name" bind:value={editedItem.name} />

        <!-- Link -->
        <Input label="Link" id="link" bind:value={editedItem.link} />

        <Input tag="textarea" id="description" bind:value={editedItem.description} label="Description" />

        <!-- Upload image and remove background -->
        <div>
          <label for="image">Image</label>
          <div class="flex flex-row gap-4 items-center">
            <div
              class="relative overflow-hidden w-24 h-32 rounded-xl shrink-0 bg-cover bg-center border border-border group"
              style="background-image: url({editedItem.image !== item.image
                ? URL.createObjectURL(editedItem.image)
                : getImageUrl(item)});"
            >
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                class="hidden"
                disabled={isLoadingNewImage}
                onchange={(e) => {
                  editedItem.image = e.target.files[0];
                }}
              />
              <label
                for="image"
                class={cn("transition-all absolute inset-0 flex flex-col items-center justify-center text-neutral-100 bg-neutral-800/50 cursor-pointer", isLoadingNewImage
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100')}
              >
                {#if isLoadingNewImage}
                  <Spinner />
                {:else}
                  <Upload class="size-6" />
                {/if}
              </label>
            </div>
            {#if editedItem.image !== item.image}
              <Button type="button" class="w-fit text-sm" variant="primary small" disabled={isLoadingNewImage} onclick={() => (handleImageUpload(true))}>Remove background</Button>
            {/if}
          </div>
        </div>

        <Input
          id="brand"
          label="Brand"
          autoComplete="off"
          bind:value={editedItem.brand}
        ></Input>

        <!-- Type and color select -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Type -->
          <Input tag="select" name="type" id="type" bind:value={editedItem.type}>
            {#each typeRegistry as t}
              <option value={t}>{t}</option>
            {/each}
          </Input>
          <!-- Color -->
          <Input tag="select" name="color" id="color" multiple bind:value={editedItem.color}>
            {#each colorRegistry as c}
              <option value={c}>{c}</option>
            {/each}
          </Input>
        </div>

        <Button type="submit" variant="primary">Save</Button>
      </form>
    </Card>
  </div>
{/if}

<Card>
  <div class="relative">
    <img src={getImageUrl(item)} class="size-full object-contain aspect-square" alt="">
    <Button class="absolute top-2 right-2" variant="primary square" onclick={() => (editItemModalVisible = true)}>
      <Pencil class="size-5" />
    </Button>
  </div>
  <hr class="bg-neutral-700/50 h-px">
  <div class="flex flex-col">
    <!-- Title and item type -->
    <div class="flex flex-row justify-between items-center">
      <h1 class="font-mono">
        {item.name}
      </h1>
      <div class="px-3 text-sm font-mono text-neutral-300 font-semibold py-1 rounded-full bg-neutral-700/50">
        {item.type}
      </div>
    </div>
    <!-- Description -->
    {#if item.description}
      <p class="text-neutral-400 text-base">
        {item.description}
      </p>
    {/if}
    <!-- Details -->
    <div class="flex flex-row gap-4 items-center mt-4">
      <!-- Color(s) -->
      <ColorCircles size={30} colors={item.color} />
      <!-- Brand -->
      {#if item?.brand}
        <div class="flex flex-row gap-2 px-3 py-1 items-center text-neutral-300 font-mono font-semibold rounded-full bg-neutral-700/50">
          <Book class="size-4" />
          {item.brand}
        </div>
      {/if}
      <!-- Link -->
      {#if item?.link}
        <a href={item.link} target="_blank" class="flex flex-row gap-2 px-3 py-1 items-center text-neutral-300 font-mono font-semibold rounded-full bg-neutral-700/50">
          <Link class="size-4" />
          {new URL(item.link).hostname}
        </a>
      {/if}
    </div>

  </div>
</Card>
