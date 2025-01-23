<script lang="ts">

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<div class="max-w-full overflow-hidden">
  <h3 class="text-lg text-primary whitespace-nowrap w-full">{title}</h3>
</div>
