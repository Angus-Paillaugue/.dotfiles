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
              highted: true,
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

You can use the `Tree` component imported from `$lib/components`. Pass it an array of objects containing each a `name` key representing for exemple a package manager and a `command` key representing the associated command.

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
              highted: true,
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
  notes={[
    "For a single file, instead of using an object with a name, you can just use a strin representing it's name"
  ]}
  definition={
    {
      "name":"props",
      "content": [
        {
          "name":"tree",
          "default":"[]",
          "type": "array",
          "description": "The actual array of tha tree."
        },
        {
          "name":"tree.name",
          "type": "string",
          "description": "The file or directory name."
        },
        {
          "name":"tree.open",
          "default":"true",
          "type": "boolean",
          "description": "If the children is a directory, controls whether the children are displayed."
        },
        {
          "name":"tree.children",
          "type": "array ? optional",
          "description": "The list of children of a directory."
        },
        {
          "name":"tree.highted",
          "type": "boolean",
          "default": "false",
          "description": "Controls weather to hight a directory or file."
        }
      ]
    }
  }
/>
