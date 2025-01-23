<script>
  import { Tree } from '@repo/components';

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
              highlighted: true,
              children: [
                {
                  name: 'core',
                  children: [
                    {
                      name: 'Tree.svelte',
                      highlighted: true
                    },
                    'index.js'
                  ]
                }
              ]
            },
            {
              name: 'utils',
              children: [
                'index.js'
              ]
            }
          ]
        }
      ]
    }
  ];
</script>

<Tree tree={treeStructure} />
