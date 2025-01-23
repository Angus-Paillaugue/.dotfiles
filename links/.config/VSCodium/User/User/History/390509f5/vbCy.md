---
lastModified: 08-16-2024
---

<script>
  import { Definition } from "$lib/components"
</script>

<Definition
  name="pages"
  description="The pages array defining the pages of the documentation."
>
  <Definition.Prop type="array" path="pages" required>The array of pages defining the pages of the documentation.</Definition.Prop>
</Definition>

<Definition
  name="page"
  description="A single page definition of the documentation."
>
  <Definition.Prop type="string" path="name" required>The name of the page or directory (the same as the filename or dirname)</Definition.Prop>
  <Definition.Prop type="string" path="icon">The name of the icon (https://icon-sets.iconify.design/).</Definition.Prop>
  <Definition.Prop type="string" path="children">The name of the page or directory (the same as the filename or dirname)</Definition.Prop>
  <Definition.Prop type="string" path="name" required>The name of the page or directory (the same as the filename or dirname)</Definition.Prop>
</Definition>

<Definition
  name="page.icon"
  description="The icon can be a string as said above but for more customisability, it can also be define like so."
>
  <Definition.Prop type="string" path="name" required>The name of the icon (https://icon-sets.iconify.design/).</Definition.Prop>
</Definition>
