---
lastModified: 08-07-2024
---

<script>
  import { Definition } from "$lib/components";
</script>


<Definition
  name="Definition"
  description="The definition component."
>
  <Definition.Prop type="string" path="name" required>The name of the component.</Definition.Prop>
  <Definition.Prop type="string" path="description">The Description of the component.</Definition.Prop>
  <Definition.Prop type="HTMLElement" path="<slot>" required>The actual contents of the note.</Definition.Prop>
</Definition>

<Definition
  name="Definition.Prop"
  description="A prop of the component."
>
  <Definition.Prop type="string" path="type" required>The name of the component.</Definition.Prop>
  <Definition.Prop type="string" path="path">The Description of the component.</Definition.Prop>
  <Definition.Prop type="HTMLElement" required="<slot>" required>The actual contents of the note.</Definition.Prop>
</Definition>
