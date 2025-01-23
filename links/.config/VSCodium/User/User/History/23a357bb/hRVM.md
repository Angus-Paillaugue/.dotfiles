---
lastModified: 07-25-2024
---

With these custom code parser, you can really add a lot of wow factor to them. Let me show you.

## Highlight lines
You can highlight line multiple ways

### In the code block data
You can highlight a single or a range of line :

```js
```js {1, 3-5}
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
console.log("Line 4");
console.log("Line 5");
```
Here is the result
```js {1, 3-5}
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
console.log("Line 4");
console.log("Line 5");
```

## File name

You can add the file name by adding `:`after the language and the file name after :

```
```javascript:filename.js
```
