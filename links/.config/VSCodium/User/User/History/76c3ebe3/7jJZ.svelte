<script lang="ts">
  interface Props {
    open: boolean;
    songId: string;
  }

  let { open = $bindable(false), songId }: Props = $props();
</script>
