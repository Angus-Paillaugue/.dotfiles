<script>
  import MainWindow from "./MainWindow.svelte";

  let window1Visible = $state();
  $inspect(window1Visible)
</script>

<MainWindow bind:visible={window1Visible} />
