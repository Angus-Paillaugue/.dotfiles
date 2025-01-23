<script lang="ts">
  import type { PageData } from './$types';
  import { format } from 'date-fns';
  import { pageMetadata } from '$lib/stores';
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import { CheckCheck, TriangleAlert, Star } from 'lucide-svelte'

  pageMetadata.set({
    title: 'Changelog',
    description:
      'We are constantly improving Logify. Here you can find the latest updates and changes.',
    breadcrumbs: []
  });

  let { data }: { data: PageData } = $props();
  const { changeLog } = data;
</script>

<div class="mx-auto w-full max-w-screen-xl p-1">
  <div class="p-4">
    <h1 class="text-3xl font-bold">Changelog</h1>
    <div class="mt-4">
      {#each changeLog as { version, date, notes, fixes, breakingChanges, features }}
        <div class="grid lg:grid-cols-4 grid-cols-1 py-24 border-t border-border">
          <div class="">
            <time datetime={date} class="text-muted-foreground text-sm">{format(date, "MMMM do yyyy")}</time>
          </div>
          <div class="lg:col-span-3 space-y-4">
            <!-- Version number -->
            <h2 class="text-4xl font-bold">
              v{version}
            </h2>
            <!-- Notes -->
            {#if notes}
              <div class="space-y-2">
                {#each notes as note}
                  <p class="text-base font-medium">{note}</p>
                {/each}
              </div>
            {/if}

            {#if breakingChanges || features || fixes}
              <Accordion.Root type="multiple">
                <!-- Breaking changes -->
                {#if breakingChanges}
                  <Accordion.Item value="breakingChanges">
                    <Accordion.Trigger>
                      <TriangleAlert class="size-6 text-red-600" />
                      Breaking changes
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div class="space-y-2">
                        {#each breakingChanges as change}
                          <p class="text-base font-medium">{change}</p>
                        {/each}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                {/if}

                <!-- Features -->
                {#if features}
                  <Accordion.Item value="features">
                    <Accordion.Trigger>
                      <Star class="size-6 text-amber-600" />
                      Features
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div class="space-y-2">
                        {#each features as feature}
                          <p class="text-base font-medium">{feature}</p>
                        {/each}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                {/if}

                <!-- Fixes -->
                {#if fixes}
                  <Accordion.Item value="fixes">
                    <Accordion.Trigger>
                      <CheckCheck class="size-6 text-green-600" />
                      Fixes
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div class="space-y-2">
                        {#each fixes as fix}
                          <p class="text-base font-medium">{fix}</p>
                        {/each}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                {/if}
              </Accordion.Root>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
