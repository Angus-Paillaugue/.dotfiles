<script lang="ts">
  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<h3 class="text-lg text-primary font-medium w-full line-clamp-1">{title}</h3>
