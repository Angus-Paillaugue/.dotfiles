<script>
  import { cn } from '$lib/utils';

  const { method = 'GET', path, headers, body, ...restProps } = $props();

  const getPathElements = () => {
    if (!path) return [];
    let pathElements = [];
    if (path.startsWith('/')) {
      pathElements =  path.slice(1);
    }
    return pathElements.split('/').map(el => ['/', el]).flat();
  }

  const isPathParam = (el) => el.startsWith('(') && el.endsWith(')');

  const sendRequest = async () => {
    const response = await fetch(path, {
      method,
      headers,
      body,
      ...restProps
    });
    console.log(response);
  }
</script>


<div class="border rounded-md border-neutral-300/50 dark:border-neutral-700/50 p-2 items-center flex flex-row gap-2">
  <div class="http-keyword w-fit" data-keyword={method.toLocaleUpperCase()}>{method.toLocaleUpperCase()}</div>
  <span class="h-6 w-px bg-neutral-300/50 dark:bg-neutral-700/50"></span>
  <div class="flex flex-row gap-2 items-center">
    {#each getPathElements() as pathElement}
      <span class={cn(isPathParam(pathElement) && "rounded-md border px-2 py-0.5 border-primary-700 bg-primary-600/20 text-primary-900 dark:text-primary-100")}>{pathElement}</span>
    {/each}
  </div>
</div>
