---
---

<script>
  import { Collapsible } from '$lib/components';
  import { Definition } from "$lib/components";
</script>

# Exemples

<Collapsible summary="Collapsible summary" icon="line-md:moon-alt-loop">

### Heading

1. Foo
2. Bar
    - Baz
    - Qux

### Some Javascript

```js
function logSomething(something) {
  console.log('Something', something);
}
```

</Collapsible>


# Definition

<Definition
name="Collapsible"
description="The collapsible component."
definition={
{
"name":"props",
"content": [
{
"name":"summary",
"type": "string",
"description": "The summary text that will apear when the collapsible is closed."
},
{
"name":"children",
"type": "HTMLElement",
"description": "The contents of the collapsible when it is expanded. Can contain markdown"
},
{
"name":"open",
"default":"false",
"type": "$bindable(boolean)",
"description": "(Optionnal) Whether the collapsible is open by default or not."
},
{
"name":"icon",
"type": "string",
"description": "(Optionnal) The name of the icon that will apear between the summary arrow and text."
},
{
"name":"class",
"type": "string",
"description": "(Optionnal) List of classes to apply the the outside most element"
},
{
"name":"defaultOpen",
"default":"false",
"type": "boolean",
"description": "Whether the collapsible is open by default or not."
},
{
"name":"defaultOpen",
"default":"false",
"type": "boolean",
"description": "Whether the collapsible is open by default or not."
}
]
}}
/>
