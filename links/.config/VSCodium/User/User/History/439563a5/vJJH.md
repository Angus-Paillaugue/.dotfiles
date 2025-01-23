---
name: Definition
---

<script>
  import { Definition } from "$lib/components";
</script>

<Definition
  name="createCollapsible"
  description="The builder function used to create the collapsible component."
  definitions={[
    {
      "name":"props",
      "content": [
          {
          "name":"disabled",
          "default":"false",
          "type": "boolean",
          "description": "Whether or not the collapsible is disabled."
        }
      ]
    }
  ]}
>
</Definition>
