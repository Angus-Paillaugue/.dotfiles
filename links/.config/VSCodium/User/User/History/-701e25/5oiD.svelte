<script>
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

<section>
  <button
    on:click={() => {
      open = !open
    }}
  >
    <div>
      <span class="transition" class:open> ▶ </span>
      <p>{buttonText}</p>
    </div>
  </button>
  <div use:slide={open}>
    <slot />
  </div>
</section>

<style>
  .open {
    transform: rotate(90deg);
    transform-origin: center;
  }
</style>
