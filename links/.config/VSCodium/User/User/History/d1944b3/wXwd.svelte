<script lang="ts">
  import { format } from 'date-fns';
  import type { PageData } from './$types';

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
            <time datetime={date} class="text-muted-foreground text-sm">{format(date, "do MMMM yyyy")}</time>
          </div>
          <div class="lg:col-span-3">
            <h2 class="text-lg font-semibold">
              v{version}
            </h2>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
