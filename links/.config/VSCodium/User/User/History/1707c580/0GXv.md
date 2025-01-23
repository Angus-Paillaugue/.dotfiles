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
  <Definition.Prop type="string" path="name" required>The name of your project.</Definition.Prop>
  <Definition.Prop type="string" path="description" required></Definition.Prop>
  <Definition.Prop type="string" path="author">If the page is a directory, pass this prop. An array of pages.</Definition.Prop>
  <Definition.Prop type="string" path="keywords">Used for SEO. Used to describe your project </Definition.Prop>
</Definition>
