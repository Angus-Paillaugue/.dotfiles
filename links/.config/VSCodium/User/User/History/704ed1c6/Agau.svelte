<script>
  import { project, pages } from '$conf';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import { addCopyCodeButtonFunctionality } from '$lib/utils';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Button } from '$lib/components';
  import { backOut } from 'svelte/easing';
  import Lenis from 'lenis';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  gsap.registerPlugin(ScrollTrigger);

  const accessibilityScore = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
  const performanceScore = tweened(0, {
		duration: 1500,
		easing: cubicOut
	});

  const docsHomePage = getDocsHomePage();
  let getStartedButtonNavShown = $state(false);

  onMount(() => {
    addCopyCodeButtonFunctionality();

    // Run on page scroll and load
    window.onscroll = onScroll;
    onScroll();

    const lenis = new Lenis({
      prevent: (node) => node.classList.contains('lenis-prevent')
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const configurationSection = document.getElementById('horizontalScroll');
    let configurationSectionItems = gsap.utils.toArray('#horizontalScroll .item');

    gsap.to(configurationSectionItems, {
      xPercent: -100 * (configurationSectionItems.length),
      ease: 'sine.out',
      scrollTrigger: {
        trigger: configurationSection,
        pin: true,
        start: 'top top',
        scrub: 1,
        end: '+=' + configurationSection.offsetWidth,
        onToggle: ({ isActive }) => {
          accessibilityScore.set(isActive ? 100 : 0);
        },
        onUpdate({ progress }) {
          accessibilityScore.set(progress > 0 ? 100 : 0);
          performanceScore.set(progress > 0.45 ? Math.min(100, progress * 100 + 20) : 0);
        }
      }
    });

    return () => {
      window.onscroll = null;
    };
  });

  /**
   * Function that handles the scroll event.
   */
  function onScroll() {
    const screenHeight = window.screen.availHeight;
    const triggerHeight = window.scrollY + (screenHeight / 3) * 2;
    // Show get started button in the nav when the user scrolls past 1/3 of the screen height
    getStartedButtonNavShown = triggerHeight > screenHeight;
  }

  /**
   * Function to get the documentation home page.
   *
   * @returns {page}
   */
  function getDocsHomePage() {
    // Get the first page that doesn't have children in the pages lists from the config.
    return pages.filter((page) => !page?.children)[0];
  }
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />

  <style>
    @keyframes text {
      0%,
      100% {
        background-size: 200% 200%;
        background-position: left center;
      }
      50% {
        background-size: 200% 200%;
        background-position: right center;
      }
    }
  </style>
</svelte:head>

<!-- Navbar -->
<nav
  class="fixed left-1/2 top-5 z-30 flex h-16 w-[calc(100vw-40px)] -translate-x-1/2 gap-x-6 rounded-full border border-main bg-neutral-50/75 p-4 backdrop-blur-md dark:border-main-dark dark:bg-neutral-600/50 md:w-[584px]"
>
  <div class="relative h-full w-full">
    <div
      class="absolute top-1/2 w-fit -translate-y-1/2 transition-all duration-500 ease-back-out {getStartedButtonNavShown
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'}"
    >
      <h1
        class="m-0 inline-block w-fit bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 bg-clip-text text-center text-2xl font-bold text-transparent dark:from-primary-500 dark:via-neutral-200 dark:to-primary-500 dark:text-transparent"
        style="animation: text 5s ease infinite;"
      >
        {project.name}
      </h1>
    </div>

    {#if getStartedButtonNavShown}
      <span
        transition:fly={{ y: '-100%', duration: 500, easing: backOut }}
        class="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Button href="/docs/{docsHomePage.name}" name="Go home" class="rounded-full py-1.5"
          >Get started</Button
        >
      </span>
    {/if}
  </div>
</nav>

<div class="isolate flex w-full flex-col bg-body-dark dark:bg-body">
  <main class="overflow-clip rounded-b-[32px] bg-body dark:bg-body-dark">
    <!-- Main page -->
    <Hero {docsHomePage} />

    <div id="learn-more">
      <!-- Desktop horizontal scroll -->
      <section
        id="horizontalScroll"
        class="hidden lg:flex h-screen flex-col justify-center pl-[50vw]"
        data-lenis-prevent
      >
        <div class="grid grid-cols-4 w-[500%]">
          <!-- Accessibility -->
          <div
            class="item lg:h-[500px] flex flex-col lg:flex-row overflow-hidden rounded-l-[50px] border border-r-0 border-main dark:border-main-dark"
          >
            <div class="flex flex-col items-center justify-center px-40">
              <!-- Progress bar -->
              <div class="relative size-32 rounded-full">
                <svg viewBox="0 0 120 120" class="size-full -rotate-90">
                  <circle class="text-green-600/10" fill="currentColor" r="60" cx="60" cy="60" stroke-width="8"></circle>
                  <circle style="--val: {$accessibilityScore};" stroke-dasharray="100" stroke-dashoffset="calc(100 - var(--val))" cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="12" pathLength="100" stroke-linecap="round" class="text-green-400" />
                </svg>
                <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-bold !text-white">
                  {Math.round($accessibilityScore)}%
                </span>
              </div>
            </div>
            <div class="p-4">
              <h2>Accessibility: Perfect Scores Across the Board</h2>
              <p>
                Accessibility is at the heart of our documentation template. Every page and component in your documentation is designed with inclusivity in mind, ensuring that your content is accessible to everyone. With a perfect score on all pages according to Google Lighthouse, you can rest assured that your documentation will meet the highest accessibility standards. Whether it's screen reader compatibility, keyboard navigation, or color contrast, we've got you covered.
              </p>
              <a href="https://pagespeed.web.dev/analysis/https-svelte-shine-paillaugue-fr-docs-Quickstart/z7j8yxr328?form_factor=desktop" class="link" target="_blank">See the report</a>
            </div>
          </div>

          <!-- Environnement -->
          <div
            class="item lg:h-[500px] flex flex-col lg:flex-row overflow-hidden border border-main dark:border-main-dark"
          >
            <div class="flex flex-col items-center justify-center px-40">
              <div class="relative w-fit h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 193 179" xml:space="preserve" role="img" aria-hidden="true" class="size-36"><path d="M181.3 55C164.1 20.7 121.5-4.3 77.4.6c-5.8.7-11.4 1.6-16.9 3.2-6.9 2-12.2 8.4-9.8 14.9 1.1 2.9 3.5 5.6 6.6 7.2-18.5 8.2-34.6 20.2-45.5 35.5C-.6 78.9-3.8 100.1 5 119.3c8.1 17.6 21.8 32.1 39.8 42.8 32.6 19.5 78.9 23.6 113 4.5 9.9-5.5 18.7-12.8 24.6-21.7 6.6-10 9.1-21.3 10.1-32.7 1.9-19.5-2.2-39.2-11.2-57.2z" fill="#00ffbc"></path></svg>
                <span class="text-body dark:text-body-dark font-extrabold text-6xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  A
                </span>
              </div>
            </div>
            <div class="p-4">
              <h2>Environmentally Friendly: Sustainable by Design</h2>
              <p>Building a sustainable web presence is more important than ever, and we've made sure our template leads by example. With an A rating from WebsiteCarbon.com, this documentation template is cleaner and more energy-efficient than 87% of websites worldwide. By using our solution, you're contributing to a greener internet, helping to reduce carbon footprints while delivering fast, reliable content to your users.</p>
              <a href="https://www.websitecarbon.com/website/svelte-shine-paillaugue-fr/" class="link" target="_blank">See our score</a>
            </div>
          </div>

          <!-- Configuration -->
          <div
            class="item grid lg:h-[500px] grid-cols-1 overflow-hidden pl-16 gap-10 border-y border-r border-main dark:border-main-dark lg:grid-cols-2"
          >
            <div class="flex flex-col items-center justify-center">
              <picture>
                <source
                  media="(max-width: 960px)"
                  srcset="/homepage/editConfiguration_720.png"
                />
                <img src="/homepage/editConfiguration_1440.png" alt="Editing config file mockup" class="object-contain">
              </picture>
            </div>
            <div class="p-4">
              <h2>Easy Configuration: Streamlined Setup for Maximum Efficiency</h2>
              <p>Simplicity meets power in our easy-to-use configuration system. With just a single config file, you can set up your entire documentation site effortlessly. No need to dive into complex configurations or struggle with endless settings—just populate the file with your project info, colors and start writing your markdown pages. It's never been easier to create and maintain high-quality documentation.</p>
            </div>
          </div>

          <!-- Performance -->
          <div
            class="item grid lg:h-[500px] grid-cols-1 overflow-hidden rounded-r-[50px] border border-l-0 border-main dark:border-main-dark lg:grid-cols-2"
          >
            <div class="flex flex-col items-center justify-center px-40">
              <!-- Progress bar -->
              <div class="relative size-32 rounded-full">
                <svg viewBox="0 0 120 120" class="size-full -rotate-90">
                  <circle class="text-green-600/10" fill="currentColor" r="60" cx="60" cy="60" stroke-width="8"></circle>
                  <circle style="--val: {$performanceScore};" stroke-dasharray="100" stroke-dashoffset="calc(100 - var(--val))" cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="12" pathLength="100" stroke-linecap="round" class="text-green-400" />
                </svg>
                <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-bold !text-white">
                  {Math.round($performanceScore)}%
                </span>
              </div>
            </div>
            <div class="p-4">
              <h2>Performance: Lightning-Fast Load Times and Near-Perfect Scores</h2>
              <p>In the world of web performance, every millisecond counts, and we've optimized our template to ensure your documentation loads blazingly fast. Thanks to careful attention to detail and efficient code, many pages in your documentation achieve near-perfect performance scores on Google Lighthouse. Whether your users are on the latest devices or older hardware, they'll enjoy a smooth, responsive experience that keeps them focused on your content.</p>
              <a href="https://pagespeed.web.dev/analysis/https-svelte-shine-paillaugue-fr-docs-Quickstart/z7j8yxr328?form_factor=desktop" class="link" target="_blank">See the report</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Mobile bento grid -->
      <section
        class="mx-auto grid lg:hidden max-w-screen-2xl grid-cols-1 gap-2 px-4 my-24 grid-rows-4 md:grid-rows-2 md:px-10"
        id="learn-more"
      >

        <!-- Accessibility -->
        <div
          class="relative col-span-1 overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark max-md:rounded-t-[50px] md:rounded-t-[50px] xl:p-8 min-h-[40px] "
        >
          <!-- Progress bar -->
          <div class="flex flex-col w-[80%] mx-auto h-2/3 items-center justify-center">
            <div class="relative size-[200px] rounded-full">
              <svg viewBox="0 0 120 120" class="size-full -rotate-90">
                <circle class="text-green-600/10" fill="currentColor" r="60" cx="60" cy="60" stroke-width="8"></circle>
                <circle style="--val: 100;" stroke-dasharray="100" stroke-dashoffset="calc(100 - var(--val))" cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="12" pathLength="100" stroke-linecap="round" class="text-green-400" />
              </svg>
              <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-bold !text-white">
                100%
              </span>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
          >
            <h1 class="m-0 text-base font-medium">Accessibility: Perfect Scores Across the Board</h1>
            <span>
              Your documentation is fully accessible, with perfect Google Lighthouse scores. Every page and component is designed for inclusivity, ensuring that everyone can easily navigate and understand your content.
            </span>
            <span><a href="https://pagespeed.web.dev/analysis/https-svelte-shine-paillaugue-fr-docs-Quickstart/z7j8yxr328?form_factor=desktop" class="link" target="_blank">See the report</a></span>
          </div>
        </div>

        <!-- Environnement -->
        <div
          class="relative col-span-1 min-h-[400px] overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark xl:p-8"
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
          class="relative col-span-1 flex flex-col items-center gap-2 overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark xl:p-8 md:rounded-bl-[50px]"
        >
          <picture class="w-[80%] pb-10">
            <source
              media="(max-width: 960px)"
              srcset="/homepage/editConfiguration_720.png"
            />
            <img src="/homepage/editConfiguration_1440.png" alt="Editing config file mockup" class="object-contain mx-auto">
          </picture>
          <div
            class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
          >
            <h1 class="m-0 text-base font-medium">Easy Configuration</h1>
            <span>Set up your entire documentation site with a single config file. It's simple, quick, and lets you focus on writing your content without worrying about complex settings.</span>
          </div>
        </div>

        <!-- Performance -->
        <div
          class="relative col-span-1 flex flex-col items-center gap-2 overflow-hidden rounded border border-main p-4 text-center dark:border-main-dark xl:p-8 rounded-b-[50px] md:rounded-bl-none min-h-[400px]"
        >
          <div class="flex flex-col w-[80%] mx-auto h-2/3 items-center justify-center">
            <!-- Progress bar -->
            <div class="relative size-[200px] rounded-full">
              <svg viewBox="0 0 120 120" class="size-full -rotate-90">
                <circle class="text-green-600/10" fill="currentColor" r="60" cx="60" cy="60" stroke-width="8"></circle>
                <circle style="--val: 98;" stroke-dasharray="100" stroke-dashoffset="calc(100 - var(--val))" cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="12" pathLength="100" stroke-linecap="round" class="text-green-400" />
              </svg>
              <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-bold !text-white">
                98%
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
    </div>
  </main>

  <Footer />
</div>
