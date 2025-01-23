---
name: Tree
lastModified: 08-09-2024
---

<script>
  import { Tree, Definition } from "$lib/components";

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
          open: false,
          children: [
            "Commands.md", "Tooltip.md", "Tree.md"
          ]
        }
      ]
    }
  ]
</script>

You can use the `Commands` component imported from `$lib/components`. Pass it an array of objects containing each a `name` key representing for exemple a package manager and a `command` key representing the associated command.

# Config

```svelte
<script>
  import { Tree } from '$lib/components';

  const treeStructure = [
    {
      name: 'src',
      children: [
        '+page.svelte',
        'Component.svelte',
        {
          name: 'lib',
          children: [
            {
              name: 'components',
              children: [
                {
                  name: 'core',
                  children: [
                    {
                      name: 'Tree.svelte',
                      highted: true
                    },
                    'index.js'
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'docs',
      children: [
        'Home.md',
        {
          name: 'Components',
          open: false,
          children: ['Commands.md', 'Tooltip.md', 'Tree.md']
        }
      ]
    }
  ];
</script>

<Tree tree={treeStructure} />
```

# Result

<Tree tree={treeStructure} />



# Definition

<Definition
  name="Tree"
  description="The tree component."
  definition={
    {
      "name":"props",
      "content": [
        {
          "name":"tree",
          "default":"[]]",
          "type": "array",
          "description": "The actual array of tha tree."
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
    }
  }
/>
