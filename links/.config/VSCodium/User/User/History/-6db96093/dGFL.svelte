<script lang="ts">
  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<h3 class="text-lg text-primary text-start font-medium w-full line-clamp-1">{title}</h3>
