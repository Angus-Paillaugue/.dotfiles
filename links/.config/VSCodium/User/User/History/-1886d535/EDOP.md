---
lastModified: 08-27-2024
---

<script>
  import { Steps } from "$lib/components"
</script>

# Backing up

First, I recommend backing up all of your project using the update script bur running

```bash no-line-numbers
npm run update
```

You will be prompted to backup your stuff.

Then, follow these simple steps

<Steps>
<Steps.Step>
If you have delete the SvelteShine remote repository, add it back (just during the update, you can remove it after)

```bash no-line-numbers
git remote add origin https://github.com/Angus-Paillaugue/SvelteShine
```
</Steps.Step>
</Steps>
