<script>
  import { theme } from './'

  theme.subscribe((value) => {
    console.log('theme', value)
    document.documentElement.classList.toggle(
      'dark',
      value === 'dark'
    )
  })
</script>
