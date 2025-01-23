<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Data definition
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
    const width = 800;
    const height = 600;

    svg = d3.select('#diagram')
      .attr('width', width)
      .attr('height', height);

    // Draw tables
    const tableGroup = svg.selectAll('g.table')
      .data(tables)
      .enter()
      .append('g')
      .attr('class', 'table')
      .attr('transform', (d, i) => `translate(${100 + i * 200}, 100)`);

    tableGroup.append('rect')
      .attr('width', 150)
      .attr('height', d => 30 + d.columns.length * 20)
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#000');

    tableGroup.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .text(d => d.name)
      .style('font-weight', 'bold');

    tableGroup.selectAll('text.column')
      .data(d => d.columns)
      .enter()
      .append('text')
      .attr('class', 'column')
      .attr('x', 10)
      .attr('y', (d, i) => 40 + i * 20)
      .text(d => `${d.name} (${d.type})`);
  });
</script>

<svg id="diagram"></svg>
