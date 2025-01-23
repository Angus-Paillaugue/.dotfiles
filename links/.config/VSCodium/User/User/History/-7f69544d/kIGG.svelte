<script>
  const { data } = $props();
  const { latestExercises } = data;
</script>
{#each latestExercises as exercise}
  <a href="/app/exercises/{exercise.id}">
    <h2>{exercise.title}</h2>
  </a>
{/each}
