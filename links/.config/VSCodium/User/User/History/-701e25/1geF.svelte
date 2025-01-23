<script>
  let isOpen = $state(false);
  function accordion(node, isOpen) {
		let initialHeight = node.offsetHeight;
		node.style.height = isOpen ? 'auto' : '56px';
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
							height: '56px',
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

<details>
  <summary class="p-2 transition-all flex flex-row justify-between items-center {itemColors} rounded cursor-pointer font-bold">

  </summary>
  <div use:accordion={isOpen}>
    <slot />
  </div>
</details>
<style>
  .open {
    transform: rotate(90deg);
    transform-origin: center;
  }
</style>
