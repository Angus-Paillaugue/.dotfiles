<script>
  import { CARDS_COLORS } from '$lib/constants';

  const { data } = $props();
  const { user } = data;

  console.log(user);

</script>


<div class="h-full grow flex flex-col pb-[4.5rem] sm:pb-28 overflow-hidden p-4 items-center relative">

  <section
    class="text-text-body rounded-3xl overflow-hidden max-w-md max-h-[700px] relative w-full h-full p-4 md:p-6 flex flex-col gap-4"
    style="background-color: #{CARDS_COLORS[0]};"
  >
  </section>
</div>
