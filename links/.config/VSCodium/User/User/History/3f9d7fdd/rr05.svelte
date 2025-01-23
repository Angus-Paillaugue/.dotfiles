<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    const { user } = data;
    console.log(user);
</script>

<div class="max-w-xl w-full mx-auto grow">
  <Card class="w-full mt-[150px]">
    <Card.Heading>Log-in</Card.Heading>
  </Card>
</div>
