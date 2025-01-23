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
  name="pages"
  description="The pages array defining the pages of the documentation."
>
  <Definition.Prop type="array" path="pages" required>The array of pages defining the pages of the documentation.</Definition.Prop>
</Definition>
