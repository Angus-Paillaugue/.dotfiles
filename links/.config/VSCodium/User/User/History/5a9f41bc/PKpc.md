---
lastModified: 08-25-2024
---

<script>
  import { Steps } from "$lib/components";
</script>

<Steps>
<Steps.Step>
Task one

```js
function test() {
  console.log('test');
}
```
</Steps.Step>

<Steps.Step>

Task two
 - test
 - test2

</Steps.Step>

<Steps.Step>
Task three
</Steps.Step>

</Steps>

# Definition

<Definition
  name="Tree"
  description="The tree component."
>
  <Definition.Prop type="<slot>" path="children">The list of Steps.Step.</Definition.Prop>
  <Definition.Prop type="string" path="class">The file or directory name.</Definition.Prop>
</Definition>
