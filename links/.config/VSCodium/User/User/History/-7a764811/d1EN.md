---
lastModified: 07-25-2024
---

To sort directories between themselves, you can add metadata in their names.
By default, directories all have an order of a 1000 so they are sorted by their names.
To order them, you can rename a directory by adding `(order: 1001)` at the end of their name (with any value you want).


```js exec
import Counter from './path/to/Counter.svelte';

let number = 500;
```

<Counter count="{number}" />

Inline components <Counter count="{5}" /> are absolute fine too.
