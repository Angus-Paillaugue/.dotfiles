<script lang="ts">
  import * as Card from '$lib/components/ui/card';
</script>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
  <div class="grid gap-4 md:gap-8 xl:grid-cols-3">
    <!-- Recent logs list -->
    <Card.Root class="xl:col-span-2">
      <Card.Header class="flex flex-row items-center">
        <div class="grid gap-2">
          <Card.Title>Logs</Card.Title>
          <Card.Description>Most recent logs.</Card.Description>
        </div>
      </Card.Header>
      <Card.Content>
      </Card.Content>
    </Card.Root>
  </div>
</div>
