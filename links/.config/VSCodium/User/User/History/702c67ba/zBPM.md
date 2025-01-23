---
name: Tree
lastModified: 08-09-2024
---

<script>
  import { Tree } from "$lib/components";

  const treeStructure = {
    {
      name: "src",
      children: [
        {
          name: "+page.svelte"
        },
        {
          name: "Component.svelte"
        }
      ]
    },
    {
      name: "docs",
      children: [
        {
          name: "Home.md"
        },
        {
          name: "Components",
          children: [
            {
              name: "Commands"
            },
            {
              name: "Tooltip"
            },
            {
              name: "Tree"
            }
          ]
        }
      ]
    }
  }
</script>


# Exemple

<Tree tree={treeStructure} />
