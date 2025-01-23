<script>
  const { data } = $props();
  const { conversations } = data;
</script>

<form action="?/createConversation" method="post">
  <button>Create</button>
</form>
