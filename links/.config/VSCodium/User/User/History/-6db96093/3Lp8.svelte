<script lang="ts">

  interface Props {
    title: string;
  }

  let { title = $bindable('') }: Props = $props();
</script>


