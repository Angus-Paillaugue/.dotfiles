---
description: Create demos of your components
lastModified: 08-28-2024
---

<script>
  import { Steps } from '$lib/components';
</script>

You can create demos od components or just re-suable code chunks with the `<Demo>` component.

# Get started

<Steps>
  <Steps.Step>

  Create a demo svelte file in `src/lib/Demos`.
  </Steps.Step>

  <Steps.Step>
  Populate the file with the code of your demo.
  </Steps.Step>

  <Steps.Step>

  Update the demos registry (used by the `<Demo>` component to fetch the component and code).

  ```bash
  npm run update-registry
  ```
  </Steps.Step>
</Steps>
