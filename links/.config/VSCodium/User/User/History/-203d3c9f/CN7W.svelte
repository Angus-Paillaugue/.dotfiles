<script>
  const { data } = $props();
  const { user, rank } = data;
</script>

<div class="grow flex flex-row gap-8 max-w-screen-xl mx-auto w-full">
  <div class="flex flex-col p-2 rounded-xl bg-neutral-900">
    <!-- Profile -->
     <div class="flex flex-row gap-4">
      <img src="/default_avatar.jpg" class="rounded-lg object-cover size-24" alt="">
      <div class="flex flex-col gap-2 justify-between">
        <h2 class="font-semi text-xl">{user.username}</h2>
        <h3 class="text-xl">
          <span class="font-bold text-neutral-400">Rank</span>
        </h3>
      </div>
     </div>
  </div>
</div>
