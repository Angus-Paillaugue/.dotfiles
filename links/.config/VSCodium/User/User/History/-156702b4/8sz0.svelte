<script>
  import { CARDS_COLORS } from '$lib/constants';

  const { data } = $props();
  const { user } = data;

  console.log(user);

</script>


<div class="h-full grow flex flex-col pb-[4.5rem] sm:pb-28 overflow-hidden">

	<!-- Main content -->
	<div class="flex grow flex-col justify-center relative">
    <section
      class="text-text-body rounded-3xl overflow-hidden max-w-md max-h-[700px] h-full"
      style="background-color: #{CARDS_COLORS[0]};"
    >
    </section>
  </div>
</div>
