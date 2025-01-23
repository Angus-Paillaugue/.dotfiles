---
lastModified: 07-25-2024
---

<script>
  import RawCodeBlock from "$lib/components/RawCodeBlock.svelte"
</script>

With these custom code parser, you can really add a lot of wow factor to them. Let me show you.


## File name

You can add the file name by adding `:`after the language and the file name after :

<RawCodeBlock>
```javascript:filename.js
```
</RawCodeBlock>


## Highlight lines
You can highlight line multiple ways

### In the code block data
You can highlight a single or a range of line :
<RawCodeBlock>
```js {1, 3-5}
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
console.log("Line 4");
console.log("Line 5");
```
</RawCodeBlock>
Here is the result
```js {1, 3-5}
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
console.log("Line 4");
console.log("Line 5");
```


### Inline highlighting
You can highlight a single or a range of line :
<RawCodeBlock>
```js
console.log("Line 1"); // [!code highlight]
console.log("Line 2");
console.log("Line 3"); // [!code highlight:3]
console.log("Line 4");
console.log("Line 5");
```
</RawCodeBlock>
Here is the result
```js
console.log("Line 1"); // [!code highlight]
console.log("Line 2");
console.log("Line 3"); // [!code highlight:3]
console.log("Line 4");
console.log("Line 5");
```


## Code diff
You can show users the deletion and addition of code lines

<RawCodeBlock>
```js
console.log("Line 1");
console.log("New line");// [!code ++]
console.log("Deleted line"); // [!code --]
console.log("Line 4");
console.log("Line 5");
</RawCodeBlock>

Here is the result

```js
console.log("Line 1");
console.log("New line");// [!code ++]
console.log("Deleted line"); // [!code --]
console.log("Line 4");
console.log("Line 5");
```
