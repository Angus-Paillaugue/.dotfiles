<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  const tables = [
    {
      name: 'user',
      columns: [
        { name: 'id', type: 'int', isPrimaryKey: true },
        { name: 'username', type: 'varchar(20)', required: true },
        { name: 'email', type: 'varchar(255)', required: true },
        { name: 'passwordHash', type: 'varchar(255)', required: true },
        { name: 'role', type: 'ENUM', default: 'guest' }
      ]
    },
    {
      name: 'server',
      columns: [
        { name: 'id', type: 'int', isPrimaryKey: true },
        { name: 'name', type: 'varchar(255)', required: true },
        { name: 'description', type: 'varchar(255)' },
        { name: 'publicUrl', type: 'varchar(255)' },
        { name: 'monitored', type: 'BOOLEAN', default: true }
      ]
    },
    {
      name: 'logs',
      columns: [
        { name: 'id', type: 'int', isPrimaryKey: true },
        { name: 'level', type: 'ENUM', default: 'debug' },
        { name: 'message', type: 'text', required: true },
        { name: 'timestamp', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        { name: 'source', type: 'varchar(255)', default: 'unknown' },
        { name: 'serverId', type: 'int', isForeignKey: true, references: 'server.id' }
      ]
    },
    {
      name: 'serverMonitoring',
      columns: [
        { name: 'id', type: 'int', isPrimaryKey: true },
        { name: 'serverId', type: 'int', isForeignKey: true, references: 'server.id' },
        { name: 'duration', type: 'float', required: true },
        { name: 'error', type: 'varchar(255)' },
        { name: 'timestamp', type: 'timestamp', default: 'CURRENT_TIMESTAMP' }
      ]
    },
    {
      name: 'emailing',
      columns: [
        { name: 'userId', type: 'int', isForeignKey: true, references: 'user.id' },
        { name: 'serverId', type: 'int', isForeignKey: true, references: 'server.id' },
        { name: 'enabled', type: 'BOOLEAN', default: true }
      ]
    }
  ];

  const relationships = [
    { from: 'logs.serverId', to: 'server.id' },
    { from: 'serverMonitoring.serverId', to: 'server.id' },
    { from: 'emailing.userId', to: 'user.id' },
    { from: 'emailing.serverId', to: 'server.id' }
  ];

  let svg;

  onMount(() => {
    const width = 1000;
    const height = 700;

    svg = d3.select('#diagram')
      .attr('width', width)
      .attr('height', height);

    const tableGroup = svg.selectAll('g.table')
      .data(tables)
      .enter()
      .append('g')
      .attr('class', 'table')
      .attr('transform', (d, i) => `translate(${100 + i * 200}, 100)`);

    // Draw table rectangles
    tableGroup.append('rect')
      .attr('height', d => 30 + d.columns.length * 20)
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#000');

    // Add table names
    tableGroup.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .text(d => d.name)
      .style('font-weight', 'bold');

    // Add table columns
    tableGroup.selectAll('text.column')
      .data(d => d.columns)
      .enter()
      .append('text')
      .attr('class', 'column')
      .attr('x', 10)
      .attr('y', (d, i) => 40 + i * 20)
      .text(d => {
        if (d.isPrimaryKey) return `PK ${d.name} (${d.type})`;
        if (d.isForeignKey) return `FK ${d.name} (${d.type}) → ${d.references}`;
        return `${d.name} (${d.type})`;
      })
      .style('fill', d => (d.isPrimaryKey ? 'blue' : d.isForeignKey ? 'green' : 'black'));

    // Draw relationships
    relationships.forEach(rel => {
      const [fromTable, fromColumn] = rel.from.split('.');
      const [toTable, toColumn] = rel.to.split('.');

      const fromTablePos = tables.findIndex(t => t.name === fromTable);
      const toTablePos = tables.findIndex(t => t.name === toTable);

      if (fromTablePos === -1 || toTablePos === -1) return;

      const x1 = 100 + fromTablePos * 200 + 150; // From right edge of the source table
      const y1 = 100 + 40 + tables[fromTablePos].columns.findIndex(c => c.name === fromColumn) * 20;

      const x2 = 100 + toTablePos * 200; // To left edge of the target table
      const y2 = 100 + 40 + tables[toTablePos].columns.findIndex(c => c.name === toColumn) * 20;

      svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', '#000')
        .attr('marker-end', 'url(#arrow)');
    });

    // Add arrow marker for relationships
    svg.append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 10)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 Z')
      .attr('fill', '#000');
  });
</script>

<svg id="diagram"></svg>

<style>
  svg {
    background: #fff;
    border: 1px solid #ccc;
  }

  .table text {
    font-family: sans-serif;
    font-size: 12px;
  }

  .table rect {
    rx: 5;
    ry: 5;
  }
</style>
