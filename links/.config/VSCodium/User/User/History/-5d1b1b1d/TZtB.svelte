<script>
  import { createHighlighter } from 'shiki';
  import { Spinner } from '$lib/components';
	import { onMount } from 'svelte';
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
    themes: Object.values(themes),
    langs: [problem.language.toLowerCase()]
  });

  let editorWindow = $state()
  let userWrittenSolution = $state(problem.startingPoint)

  onMount(() => {
    editorWindow.on('focus', () => {
      console.log('Editor focused');

    })
  })
</script>

<div class="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4 p-4 h-screen">
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
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div id="editor" class="h-full" tabindex='0' bind:this={editorWindow}>
        {@html highlighter.codeToHtml(userWrittenSolution, {
          themes: themes,
          lang: problem.language.toLowerCase()
        })}
      </div>
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>

</div>
