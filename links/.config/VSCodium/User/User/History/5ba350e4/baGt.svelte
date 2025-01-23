<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  const accessibilityScore = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
  const performanceScore = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});

  onMount(() => {
    // For updating the progress bar when it intersects with the viewport
    const observer = new IntersectionObserver(intersect, { threshold: 1, rootMargin: '0px 0px -100px 0px' });
    // Observe both of the progress bars
    const accessibilityProgress = document.getElementById('accessibilityProgress');
    const performanceProgress = document.getElementById('performanceProgress');
    observer.observe(accessibilityProgress);
    observer.observe(performanceProgress);

    // Function to update the progress bar based on intersection
    function intersect([entry]) {
      if(entry.target === accessibilityProgress) {
        accessibilityScore.set(entry.isIntersecting ? 100 : 0);
      }else {
        performanceScore.set(entry.isIntersecting ? 100 : 0);
      }
    }

    return () => {
      observer.disconnect();
    };
  });

  function reveal(node) {
    let options = {
      once: true
    };
    const debug = (msg) => {
      console.log(`%c${msg}`, 'color: yellow');
    }
    const CLASSES = 'translate-y-8 opacity-0'.split(' ');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.5
    };

    node.classList.add(...'transition-all'.split(' '));
    node.classList.add(...CLASSES);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          debug('Element is visible');
          entry.target.classList.remove(...CLASSES);
          if(options.once) {
            debug('Unobserving');
            observer.unobserve(entry.target);
          }
        }else {
          debug('Element is hidden');
          if(!options.once)
            entry.target.classList.add(...CLASSES);
        }
      });
    }, observerOptions);

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
</script>

<section
      class="mx-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-2 gap-2 px-4 my-24 grid-rows-4 md:grid-rows-2 md:px-10"
      id="learn-more"
    >

      <!-- Accessibility -->
      <div
        class="relative overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark rounded-t-[50px] lg:rounded-tr-none xl:p-8 min-h-[40px] "
      >
        <!-- Progress bar -->
        <div class="flex flex-col w-[80%] mx-auto h-2/3 items-center justify-start">
          <div class="relative size-[150px] rounded-full" id="accessibilityProgress">
            <svg viewBox="0 0 120 120" class="size-full -rotate-90">
              <circle class="text-green-600/10" fill="currentColor" r="60" cx="60" cy="60" stroke-width="8"></circle>
              <circle style="--val: {$accessibilityScore};" stroke-dasharray="100" stroke-dashoffset="calc(100 - var(--val))" cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="12" pathLength="100" stroke-linecap="round" class="text-green-400" />
            </svg>
            <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-bold !text-white">
              {Math.round($accessibilityScore)}%
            </span>
          </div>
        </div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Accessibility</h1>
          <span>
            Your documentation is fully accessible, with perfect Google Lighthouse scores. Every page and component is designed for inclusivity, ensuring that everyone can easily navigate and understand your content.
          </span>
          <span><a href="https://pagespeed.web.dev/analysis/https-svelte-shine-paillaugue-fr-docs-Quickstart/z7j8yxr328?form_factor=desktop" class="link" target="_blank">See the report</a></span>
        </div>
      </div>

      <!-- Environnement -->
      <div
        class="relative min-h-[400px] overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark xl:p-8 lg:rounded-tr-[50px]"
      >
        <!-- Score blob -->
        <div class="flex flex-col w-[80%] mx-auto h-2/3 items-center justify-center">
          <div class="relative w-fit h-fit">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 193 179" xml:space="preserve" role="img" aria-hidden="true" class="size-36"><path d="M181.3 55C164.1 20.7 121.5-4.3 77.4.6c-5.8.7-11.4 1.6-16.9 3.2-6.9 2-12.2 8.4-9.8 14.9 1.1 2.9 3.5 5.6 6.6 7.2-18.5 8.2-34.6 20.2-45.5 35.5C-.6 78.9-3.8 100.1 5 119.3c8.1 17.6 21.8 32.1 39.8 42.8 32.6 19.5 78.9 23.6 113 4.5 9.9-5.5 18.7-12.8 24.6-21.7 6.6-10 9.1-21.3 10.1-32.7 1.9-19.5-2.2-39.2-11.2-57.2z" fill="#00ffbc"></path></svg>
            <span class="text-body dark:text-body-dark font-extrabold text-6xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              A
            </span>
          </div>
        </div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Environmentally Friendly</h1>
          <span>Our template is among the greenest on the web, outperforming 87% of websites in energy efficiency. By using this template, you're contributing to a more sustainable internet.</span>
          <span><a href="https://www.websitecarbon.com/website/svelte-shine-paillaugue-fr/" class="link" target="_blank">See our score</a></span>
        </div>
      </div>

      <!-- Configuration -->
      <div
        class="relative flex flex-col items-center gap-2 overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark xl:p-8 lg:rounded-bl-[50px]"
      >
        <picture class="w-[80%]">
          <source
            media="(max-width: 500px)"
            srcset="/homepage/editConfiguration_480.webp"
          />
          <img src="/homepage/editConfiguration_720.webp" alt="Editing config file mockup" class="object-contain mx-auto">
        </picture>
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-transparent to-white to-60% dark:to-neutral-900"
        ></div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Easy Configuration</h1>
          <span>Set up your entire documentation site with a single config file. It's simple, quick, and lets you focus on writing your content without worrying about complex settings.</span>
        </div>
      </div>

      <!-- Performance -->
      <div
        class="relative flex flex-col items-center gap-2 overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark xl:p-8 rounded-b-[50px] lg:rounded-bl-none min-h-[400px]"
        use:reveal
      >
        <div class="flex flex-col w-[80%] mx-auto h-2/3 items-center justify-start">
          <!-- Progress bar -->
          <div class="relative size-[150px] rounded-full" id="performanceProgress">
            <svg viewBox="0 0 120 120" class="size-full -rotate-90">
              <circle class="text-green-600/10" fill="currentColor" r="60" cx="60" cy="60" stroke-width="8"></circle>
              <circle style="--val: {$performanceScore};" stroke-dasharray="100" stroke-dashoffset="calc(100 - var(--val))" cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="12" pathLength="100" stroke-linecap="round" class="text-green-400" />
            </svg>
            <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-bold !text-white">
              {Math.round($performanceScore)}%
            </span>
          </div>
        </div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Performance</h1>
          <span>Experience lightning-fast load times and near-perfect performance scores. Our optimized template ensures your documentation is smooth and responsive on any device.</span>
        </div>
      </div>
    </section>
