<script>
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="overflow-hidden">

  <Hero />

  <!-- Bento -->
  <main id="more-infos">
    <div class="py-32">
      <div class="px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-7xl">
          <div
            class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2"
          >
            <div
              class="max-lg:rounded-t-4xl lg:rounded-tl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 lg:col-span-3"
            >
              <div class="relative h-80 shrink-0">
                <div
                  class="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat"
                ></div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]"
                ></div>
              </div>
              <div class="relative p-10">
                <h3
                  class="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400"
                >
                  Category
                </h3>
                <p
                  class="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white"
                >
                  Title
                </p>
                <p
                  class="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis accusamus adipisci repudiandae fuga eius, laboriosam quia sed ipsum dolorum.
                </p>
              </div>
            </div>
            <div
              class="lg:rounded-tr-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 lg:col-span-3"
            >
              <div class="relative h-80 shrink-0">
                <div
                  class="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat"
                ></div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]"
                ></div>
              </div>
              <div class="relative p-10">
                <h3
                  class="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400"
                >
                  Category
                </h3>
                <p
                  class="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white"
                >
                  Title
                </p>
                <p
                  class="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis accusamus adipisci repudiandae fuga eius, laboriosam quia sed ipsum dolorum.
                </p>
              </div>
            </div>
            <div
              class="max-lg:rounded-b-4xl lg:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 lg:col-span-2"
            >
              <div class="relative h-80 shrink-0">
                <!-- Content -->
              </div>
              <div class="relative p-10">
                <h3
                  class="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500"
                >
                  Category
                </h3>
                <p
                  class="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950"
                >
                  Title
                </p>
                <p class="mt-2 max-w-[600px] text-sm/6 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis accusamus adipisci repudiandae.
                </p>
              </div>
            </div>
            <div
              class="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 lg:col-span-2"
            >
            <!-- Ripple svg -->
              <div class="relative h-80 shrink-0">
                <div aria-hidden="true" class="relative h-full overflow-hidden">
                  <div class="absolute inset-0">
                    <div
                      style="--opacity:3%;width:528px;height:528px"
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,transparent_25%,color-mix(in_srgb,_theme(colors.blue.500)_var(--opacity),transparent)_100%)] ring-1 ring-inset ring-blue-500/[8%]"
                    ></div>
                    <div
                      style="--opacity:5%;width:400px;height:400px"
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,transparent_25%,color-mix(in_srgb,_theme(colors.blue.500)_var(--opacity),transparent)_100%)] ring-1 ring-inset ring-blue-500/[8%]"
                    ></div>
                    <div
                      style="--opacity:5%;width:272px;height:272px"
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,transparent_25%,color-mix(in_srgb,_theme(colors.blue.500)_var(--opacity),transparent)_100%)] ring-1 ring-inset ring-blue-500/[8%]"
                    ></div>
                    <div
                      style="--opacity:10%;width:144px;height:144px"
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,transparent_25%,color-mix(in_srgb,_theme(colors.blue.500)_var(--opacity),transparent)_100%)] ring-1 ring-inset ring-blue-500/[8%]"
                    ></div>
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-white to-35%"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="relative p-10">
                <h3
                  class="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500"
                >
                  Category
                </h3>
                <p
                  class="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950"
                >
                  Title
                </p>
                <p class="mt-2 max-w-[600px] text-sm/6 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis accusamus adipisci repudiandae.
                </p>
              </div>
            </div>
            <div
              class="max-lg:rounded-b-4xl lg:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 lg:col-span-2"
            >
              <div class="relative h-80 shrink-0">
                <!-- Content -->
              </div>
              <div class="relative p-10">
                <h3
                  class="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500"
                >
                  Category
                </h3>
                <p
                  class="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950"
                >
                  Title
                </p>
                <p class="mt-2 max-w-[600px] text-sm/6 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis accusamus adipisci repudiandae.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</div>
