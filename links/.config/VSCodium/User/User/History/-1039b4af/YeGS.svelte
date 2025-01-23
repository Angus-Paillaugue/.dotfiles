<script>
	import { onMount } from "svelte";

  let projectsCarousel = $state();
  let carouselIndex = $state(0);
  let displayedElements = $state(3)

  const projects = [
    {
      date:2024,
      name:'Nothing Notes',
      tags:['notes', 'svelte'],
      description:'Note taking app based ont the Nothing™ design',
      link:'https://notes.paillaugue.fr ',
      bgColor:'bg-black',
      image:'https://angus.paillaugue.fr/Nothing-Notes.webp'
    },
    {
      date:2024,
      name:'Project 2',
      tags:['tag1', 'tag2', 'tag3'],
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      link:'https://google.com'
    },
    {
      date:2024,
      name:'Project 3',
      tags:['tag1', 'tag2', 'tag3'],
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      link:'https://google.com'
    },
    {
      date:2024,
      name:'Project 4',
      tags:['tag1', 'tag2', 'tag3'],
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      link:'https://google.com'
    },
    {
      date:2024,
      name:'Project 5',
      tags:['tag1', 'tag2', 'tag3'],
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      link:'https://google.com'
    },
  ]

  $effect(handleCarouselIndexChange);

  onMount(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  });

  function handleCarouselIndexChange() {
    const leftCard = projectsCarousel.children[carouselIndex];
    projectsCarousel.style.transform = `translateX(-${leftCard.offsetLeft}px)`;
  }

  function onResize() {
    displayedElements = screen.width > 768 ? 3 : 1
  }
</script>

<section id="projects" class="max-w-screen-xl mx-auto p-2 lg:p-4">
  <div class="flex flex-row items-center gap-20">
    <h1>Projects</h1>
    <p>Like most of us - I have lot of ideas and projects that I would like to implement. Many of them get lost in my notes or as random thoughts on my computer. But can you believe it? Some of them actually happen. </p>
  </div>

  <div class="flex flex-row col-[content] gap-8 relative transition-transform duration-300 ease-in-out mt-20" bind:this={projectsCarousel}>
    {#each projects as project}
      <div class="aspect-square group rounded-xl relative w-full md:w-1/3 shrink-0 group/card overflow-hidden {project.bgColor}">
        <p class="absolute top-4 right-4 text-neutral-200 bg-white/10 text-sm px-2 py-1 rounded-full">{project.date}</p>
        <div class="absolute inset-0 bg-center bg-no-repeat bg-contain" style="background-image: url({project.image});"></div>
        <div class="absolute flex flex-col inset-0 p-4 {project.bgColor}">
          <h3 class="mt-auto text-neutral-100 font-medium text-lg">{project.name}</h3>
          <div class="flex flex-nowrap overflow-auto no-scrollbar gap-4 mt-2 flex-row">
            {#each project.tags as tag}
              <span class="text-neutral-200 bg-white/10 text-xs px-2 py-1 rounded-full">{tag}</span>
            {/each}
          </div>
          <div class="h-0 overflow-hidden flex flex-col justify-between group-hover/card:grow duration-300 ease-in transition-all {project.bgColor}">
            <p class="mt-4 text-neutral-50/70">{project.description}</p>
            <div class="">
              <a href={project.link} class="text-white flex flex-row gap-2 items-center">
                Open project
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="flex flex-row-items-center justify-end gap-8 mt-4">
    <button class="rounded-full p-1 disabled:text-neutral-400 transition-colors hover:bg-neutral-300/50 group/button" aria-label="Carousel previous" onclick={() => {carouselIndex = Math.max(carouselIndex - 1, 0)}} disabled={carouselIndex === 0}>
      <svg xmlns="http://www.w3.org/2000/svg" class="size-8 transition-transform translate-x-2 group-disabled/button:translate-x-0 group-hover/button:translate-x-0" viewBox="0 0 24 24" >
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5" />
      </svg>
    </button>
    <button class="rounded-full p-1 disabled:text-neutral-400 transition-colors hover:bg-neutral-300/50 group/button" aria-label="Carousel next" onclick={() => {carouselIndex = Math.min(carouselIndex + 1, projects.length)}} disabled={projects.length - displayedElements <= carouselIndex}>
      <svg xmlns="http://www.w3.org/2000/svg" class="size-8 transition-transform -translate-x-2 group-hover/button:translate-x-0" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7" />
      </svg>
    </button>
  </div>
</section>
