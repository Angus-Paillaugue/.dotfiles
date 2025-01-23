<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";

  const problem = {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    language: 'Javascript',
    startingPoint: `const findNumbers = (target) => {

};`
  }

  let userWrittenCode = $state(problem.startingPoint);
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
    <CodeMirror bind:value={userWrittenCode} lang={javascript()} />
  </div>

</div>
