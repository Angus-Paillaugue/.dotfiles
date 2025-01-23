---
lastModified: 08-16-2024
---

<script>
  import { Definition } from "$lib/components"
</script>


<Definition
  name="sideBar"
  description="The sideBar object defining sideBar of the website."
>
  <Definition.Prop type="string" path="style" default="details">The style of the sidebar. Either "static" or "details".</Definition.Prop>
</Definition>

<Definition
  name="page"
  description="A single page definition of the documentation."
>
  <Definition.Prop type="string" path="name" required>The name of the page or directory (the same as the filename or dirname)</Definition.Prop>
  <Definition.Prop type="string" path="icon">

    The name of the icon ([https://icon-sets.iconify.design/](https://icon-sets.iconify.design/)).
  </Definition.Prop>
  <Definition.Prop type="string" path="children">If the page is a directory, pass this prop. An array of pages.</Definition.Prop>
</Definition>

<Definition
  name="page.icon"
  description="The icon can be a string as said above but for more customisability, it can also be define like so."
>
  <Definition.Prop type="string" path="name" required>

  The name of the icon ([https://icon-sets.iconify.design/](https://icon-sets.iconify.design/)).

  </Definition.Prop>
  <Definition.Prop type="string" path="class">A list of classes to apply to the icon (will override default ones).</Definition.Prop>
</Definition>


# Frontmatter definition

You can add and change properties of a page by adding them to the frontmatter at the start of the page.
Just a reminder that the frontmatter properties are included between three dashes : `---` ([see definition](https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/))

<Definition
  name="Frontmatter"
  description="The list of props of the frontmatter."
>
  <Definition.Prop type="string" path="name">The name of page displayed in both the navbar and sidebar.</Definition.Prop>
  <Definition.Prop type="string" path="description">A description of the page (displayed a the start of the page and used for the search of pages).</Definition.Prop>
  <Definition.Prop type="string" path="lastModified">The date at witch the file has last been modified (displayed at the start of the page).</Definition.Prop>
</Definition>
