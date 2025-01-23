<script>
  export let buttonText = ''
  export let open = false

  // custom slide animation
  const slide = (node, open) => {
    let initialHeight = node.offsetHeight
    node.style.height = open ? `auto` : '0px'
    node.style.overflow = 'hidden'
    let animation = node.animate(
      [{ height: '0px' }, { height: `${initialHeight}px` }],
      {
        duration: 200,
        easing: 'ease-in-out',
        fill: 'both',
        direction: open ? 'reverse' : 'normal',
      }
    )
    animation.pause()
    animation.onfinish = ({ currentTime }) => {
      if (currentTime === 0) {
        animation.reverse()
        animation.pause()
      }
    }
    return {
      update: () => {
        animation.currentTime ? animation.reverse() : animation.play()
      },
    }
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
