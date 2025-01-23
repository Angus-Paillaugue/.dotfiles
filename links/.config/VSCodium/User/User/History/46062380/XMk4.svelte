<script>
  let date = $state(new Date());

  setInterval(() => {
    date.setSeconds(date.getSeconds() + 1);
  }, 1000);
</script>

<h1>The time is {date.toLocaleTimeString()}</h1>
