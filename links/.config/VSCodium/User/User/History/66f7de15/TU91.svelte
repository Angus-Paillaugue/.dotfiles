<script lang="ts">
  interface Props {
    value: string;
    children: () => any;
  }

  let { value = $bindable(), children, ...restProps }: Props = $props();
</script>

<select bind:value {...restProps}>
  {@render children()}
</select>
