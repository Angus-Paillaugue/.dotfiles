---
lastModified: 08-16-2024
---

<script>
  import { Definition } from "$lib/components"
</script>

The pages configuration can be done on two levels :
 - In the `project.config.js`
 - In the frontmatter of the pages

The project config file is mostly used to configure the pages in the sidebar and the frontmatter the page metadata.


# `Project.config.js` definition

The page config is made thru the exported `pages` object.

<Definition
  name="page"
  description="A single page definition of the documentation."
>
  <Definition.Prop type="string" path="name" required>The name of the page or directory (the same as the filename or dirname)</Definition.Prop>
  <Definition.Prop type="string" path="icon">

    The name of the icon ([https://icon-sets.iconify.design/](https://icon-sets.iconify.design/)).

    See also [page.icon](#definition-page.icon)
  </Definition.Prop>
  <Definition.Prop type="string" path="children">If the page is a directory, pass this prop. An array of pages.</Definition.Prop>
</Definition>
