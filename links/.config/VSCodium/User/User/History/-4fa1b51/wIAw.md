---
name: Tooltip
description: Easley use tooltips
lastModified: 07-25-2024
---

## Creating a tooltip

You can add a tooltip to some text by wrapping it into a `<span>` and adding a `data-tooltip="content"` attribute to it like so :

```svelte exec
<p>
  Lorem ipsum dolor sit amet consectetur, <span data-tooltip="This does not mean anything">adipisicing elit</span>. Excepturi consectetur nihil.
</p>
```
