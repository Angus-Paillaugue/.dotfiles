<script lang="ts">
  interface Props {
    open: boolean;
    song: Song;
  }

  let { open = $bindable(false), song }: Props = $props();
</script>
