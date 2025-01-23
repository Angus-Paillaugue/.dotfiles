---
lastModified: 08-16-2024
---

<script>
  import { Definition } from "$lib/components"
</script>

<Definition
  name="project"
  description="The project object."
>
  <Definition.Prop type="string" path="name" required>The name of the page or directory (the same as the filename or dirname)</Definition.Prop>
  <Definition.Prop type="string" path="icon">

    The name of the icon ([https://icon-sets.iconify.design/](https://icon-sets.iconify.design/)).

    See also [page.icon](#definition-page.icon)
  </Definition.Prop>
  <Definition.Prop type="string" path="children">If the page is a directory, pass this prop. An array of pages.</Definition.Prop>
</Definition>
