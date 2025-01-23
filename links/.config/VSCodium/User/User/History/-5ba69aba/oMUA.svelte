<script>
  import { Status } from '$lib/components';
  const { data } = $props();
  const { problems } = data

  $inspect(problems);
</script>

<div class="max-w-screen-md w-full p-2 rounded border mx-auto mt-10">
  <h1 class="text-3xl font-bold">Problems</h1>
  <table class="w-full">
    <thead>
      <tr>
        <td>Status</td>
        <td>Title</td>
        <td>Acceptance</td>
        <td>Difficulty</td>
      </tr>
    </thead>
    <tbody>
      {#each problems as problem}
        <tr>
          <td>
            {problem.solved === 'Solved'}
            <Status tooltip={problem.solved} status={problem.solved === 'Solved'} />
          </td>
          <td>{problem.title}</td>
          <td>{problem.acceptance_rate}</td>
          <td>{problem.difficulty}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
