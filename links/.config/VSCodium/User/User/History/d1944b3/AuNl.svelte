<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { changeLog } = data;
</script>

<div class="mx-auto w-full max-w-screen-xl p-1">
  <div class="p-4">
    <h1 class="text-3xl font-bold">Changelog</h1>
    <div class="mt-4">
      {#each changeLog as { version, date, changes }, i}
        <div class="mb-4">
          <h2 class="text-2xl font-bold">{version}</h2>
          <p class="text-sm text-gray-500">{date}</p>
          <ul class="list-disc list-inside">
            {#each changes as change}
              <li>{change}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</div>
