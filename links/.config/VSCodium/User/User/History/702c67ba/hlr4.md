---
name: Tree
lastModified: 08-09-2024
---

<script>
  import { Tree } from "$lib/components";

  const treeStructure = [
    {
      name: "src",
      children: [
        "+page.svelte", "Component.svelte",
        {
          name: "lib",
          children: [
            {
              name: "components",
              children: [
                {
                  name: "core",
                  children: [
                    {
                      name:"Tree.svelte",
                      highted:true
                    },
                    "index.js"
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
    {
      name: "docs",
      children: [
        "Home.md",
        {
          name: "Components",
          children: [
            "Commands.md", "Tooltip.md", "Tree.md"
          ]
        }
      ]
    }
  ]
</script>


# Exemple

<Tree tree={treeStructure} />
