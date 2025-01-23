<script>
  const { summary, children } = $props();


  let isOpen = $state(false);
  const itemColors = 'text-primary-800 dark:text-primary-100 hover:text-primary-900 hover:bg-primary-200 dark:hover:bg-primary-700 dark:hover:bg-primary-800';


  function accordion(node, isOpen) {
		let initialHeight = node.offsetHeight;
		node.style.height = isOpen ? 'auto' : '0px';
		node.style.overflow = 'hidden';
		return {
			update(isOpen) {
				let animation = node.animate(
					[
						{
							height: initialHeight + 'px',
							overflow: 'hidden'
						},
						{
							height: '0px',
							overflow: 'hidden'
						}
					],
					{ duration: 100, fill: 'both' }
				);
				animation.pause();
				if (!isOpen) {
					animation.play();
				} else {
					animation.reverse();
				}
			}
		};
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div tabindex="0" onclick={() => (isOpen = !isOpen)}>
  <span class="p-2 transition-all flex flex-row justify-between items-center {itemColors} rounded cursor-pointer font-bold">
    {summary}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 transition-transform {isOpen ? 'transform rotate-180' : ''}"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </span>
  <div use:accordion={isOpen}>
    {@render children()}
  </div>
</div>
