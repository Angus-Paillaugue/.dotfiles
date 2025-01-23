---
lastModified: 08-14-2024
---

# Exemples

<script>
  import { Note, Definition } from "$lib/components"
</script>

<Note type="note">
  Useful information that users should know, even when skimming content.
</Note>
<Note type="tip">
  Helpful advice for doing things better or more easily.
</Note>
<Note type="important">
  Key information users need to know to achieve their goal.
</Note>
<Note type="warning">
  Urgent info that needs immediate user attention to avoid problems.
</Note>
<Note type="caution">
  Advises about risks or negative outcomes of certain actions.
</Note>

# Definition

<Definition
  name="Note"
  description="The note component."
>
  <Definition.Prop type="string" path="type" default="warning">The type of the alert. Can be "note", "tip", "important", "warning" or "caution".</Definition.Prop>
  <Definition.Prop type="HTMLElement" path="<slot>" required>The actual contents of the note.</Definition.Prop>
  <Definition.Prop type="string" path="style" default="\"custom\"">The styling of the component. Either "custom" or "github".</Definition.Prop>
  <Definition.Prop type="string" path="class">Classes to add to the alert component's outer most div.</Definition.Prop>
</Definition>
