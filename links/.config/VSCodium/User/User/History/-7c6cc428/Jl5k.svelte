<script>
  const { difficulty = "easy" } = $props();

  const difficultyClasses = {
    easy: 'bg-green-500 text-white',
    medium: 'bg-yellow-500 text-black',
    hard: 'bg-red-500 text-white',
  }
</script>

<span class={difficultyClasses[difficulty] + ' px-2 py-1 rounded-full text-sm font-semibold'}>
  {difficulty}
</span>
