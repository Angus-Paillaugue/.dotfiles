<script>
  const { data } = $props();
  const { user, rank, recentActivity } = data;
  console.log(recentActivity);

</script>

<div class="grow flex flex-row gap-8 max-w-screen-lg mx-auto w-full">
  <!-- Left column -->
  <div class="flex flex-col p-4 rounded-xl bg-neutral-900">
    <!-- Profile -->
     <div class="flex flex-row gap-4">
      <img src="/default_avatar.jpg" class="rounded-lg object-cover size-24" alt="">
      <div class="flex flex-col gap-2 justify-between">
        <h2 class="font-semibold text-xl">{user.username}</h2>
        <h3 class="text-xl">
          <span class="font-medium text-neutral-400">Rank</span>
          <span class="font-medium">{rank.user_rank}</span>
        </h3>
      </div>
     </div>
  </div>

  <!-- Recent activity -->
  <div class="flex flex-col grow p-4 rounded-xl bg-neutral-900">
  </div>
</div>
