<script>
  const { data } = $props();
  const { latestExercises } = data;
</script>
{#each latestExercises as exercise}
  <a href="">
    <h2>{exercise.title}</h2>
  </a>
{/each}
