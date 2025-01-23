<script lang="ts">

  interface Props {
    title: string;
  }

  let { title = $bindable('') }: Props = $props();
</script>

<h3 class="text-lg text-primary">{title}</h3>
