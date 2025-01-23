<script lang="ts">
  interface Props {
    value: string;
    children: () => any;
  }

  let { value = $bindable(), children }: Props = $props();
</script>

<select bind:value>
  {@render children()}
</select>
