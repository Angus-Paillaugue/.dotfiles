<script>
  import { createHighlighter } from 'shiki';
  const themes = {
    light: 'github-light',
    dark: 'github-dark-dimmed'
  }

  const problem = {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    language: 'Javascript',
    startingPoint: `const findNumbers = (target) => {

    };`
  }
  const highlighter = createHighlighter({
    themes: Object.values(  const themes = {
),
    langs: [problem.language]
  });

  let userWrittenSolution = $state(problem.startingPoint)
</script>

<div class="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4 p-4">
  <!-- Problem -->
  <div class="p-4 border rounded">
    <h1 class="text-3xl font-bold">{problem.title}</h1>
    <p>{problem.description}</p>
  </div>
  <!-- Editor -->

  <div class="p-4 border rounded">
    <h1 class="text-3xl font-bold">Editor</h1>
    {#await highlighter}
      <div class="m-2">
        <Spinner class="size-6" />
      </div>
    {:then highlighter}
      {@html highlighter.codeToHtml(userWrittenSolution, {
        themes:   const themes = {
,
        lang: problem.language
      })}
    {/await}
  </div>

</div>
