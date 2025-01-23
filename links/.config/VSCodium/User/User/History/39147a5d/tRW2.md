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
  <Definition.Prop type="boolean" path="develop" default="true">

    If the sideBar.style is set to details, this controls weather the collapsible are open (`true`) or closed (`false`) by default.
  </Definition.Prop>
  <Definition.Prop type="string" path="style" default="details">The style of the sidebar. Either "static" or "details".</Definition.Prop>
</Definition>
