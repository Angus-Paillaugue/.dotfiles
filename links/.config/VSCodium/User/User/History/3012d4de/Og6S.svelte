<script lang="ts">

  interface Props {
    children?: () => any;
    text?: string;
  }

  let { children, text }: Props = $props();
</script>

<div class="relative inline-block">
  <div class="peer">
    {@render children?.()}
  </div>
  <div class="absolute z-10 hidden w-32 p-2 text-xs text-white bg-black rounded-lg shadow-lg top-0 left-0 transform -translate-x-1/2 -translate-y-full opacity-0 pointer-events-none peer-hover:opacity-100 peer-hover:pointer-events-auto">
    {text}
  </div>
</div>
