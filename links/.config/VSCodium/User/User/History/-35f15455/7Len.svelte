<script>
  const { children } = $props();
    const httpMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'TRACE'
  ];

  const getHttpMethod = (text) =>
    httpMethods.find((method) => text.toUpperCase().startsWith(method));
</script>

<h1>
  {@render children()}
</h1>
