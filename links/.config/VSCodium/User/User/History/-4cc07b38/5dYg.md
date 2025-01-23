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
"name":"disabled",
"default":"false",
"type": "boolean",
"description": "Whether or not the collapsible is disabled."
},
{
"name":"forceVisible",
"default":"false",
"type": "boolean",
"description": "Whether or not to force the collapsible to always be visible. This is useful for custom transitions and animations using conditional blocks."
},
{
"name":"defaultOpen",
"default":"false",
"type": "boolean",
"description": "Whether the collapsible is open by default or not."
},
{
"name":"open",
"type": "Writable<boolean>",
"description": "A writable store that controls whether or not the collapsible is open."
},
{
"name":"onOpenChange",
"type": "ChangeFn<boolean>",
"description": "A callback called when the value of the open store should be changed."
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
