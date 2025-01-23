<script lang="ts">
  import { Motion, AnimatePresence } from "svelte-motion";
  import { cn } from "$lib/utils";
  export let duration = 0.4;
  export let delay = 0;
  export let yOffset = 6;
  export let inViewMargin = "-50px";
  export let blur = "6px";
  export let id = crypto.randomUUID().slice(0, 8);
  export let once = false;
  let defaultVariants = {
    hidden: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
    visible: { opacity: 1, y: 0, filter: `blur(0px)` },
  };
  let isInView = "hidden";

  let className = "";
  export { className as class };


  function inview(node: HTMLElement, options: any) {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.dispatchEvent(new CustomEvent("inview_change", { inView: true }));
        } else {
          node.dispatchEvent(new CustomEvent("inview_change", { inView: false }));
        }
      });
    }, options);

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }
</script>

<AnimatePresence list={[{ key: id }]}>
  <Motion
    initial="hidden"
    animate={isInView}
    exit="hidden"
    variants={defaultVariants}
    transition={{
      delay: 0.04 + delay,
      duration,
      ease: "easeOut",
    }}
    let:motion
  >
    <div
      use:inview={{ rootMargin: inViewMargin, unobserveOnEnter: once }}
      use:motion
      oninview_change={(inView) => {
        console.log("Change")
        isInView = inView ? "visible" : "hidden";
      }}
      class={cn(className)}
    >
      <slot>Default</slot>
    </div>
  </Motion>
</AnimatePresence>
