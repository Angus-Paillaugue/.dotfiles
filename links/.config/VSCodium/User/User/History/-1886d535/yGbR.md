---
lastModified: 08-27-2024
---

<script>
  import { Steps, Note } from "$lib/components"
</script>

<Note type="warning">
  We strongly advise you to backup everything 
</Note>

# Backing up

First, I recommend backing up all of your project using the update script bur running

```bash no-line-numbers
npm run backup
```

You will be prompted to backup your stuff.


# Updating

Then, follow these simple steps

<Steps>
<Steps.Step>
If you have delete the SvelteShine remote repository, add it back (just during the update, you can remove it after)

```bash no-line-numbers
git remote add origin https://github.com/Angus-Paillaugue/SvelteShine
```
</Steps.Step>

<Steps.Step>
Fetch the new update content

```bash no-line-numbers
git fetch origin
```
</Steps.Step>

<Steps.Step>
Merge the updated content with your own

```bash no-line-numbers
git merge origin/main
```
</Steps.Step>

<Steps.Step>
During the previous step, conflicts might have appeared. You will need to resolve them manually. If you mess up, remember that you have all of your files in the `backup` directory (if you backed up your work)

```bash no-line-numbers
git add <resolved-file>
git merge --continue
```
</Steps.Step>

<Steps.Step>
If you have delete the SvelteShine remote repository, add it back (just during the update, you can remove it after)

```bash no-line-numbers
git remote add origin https://github.com/Angus-Paillaugue/SvelteShine
```
</Steps.Step>
</Steps>
