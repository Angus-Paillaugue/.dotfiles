import type { Log } from '@shared/types';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { formatTimestamp } from '$lib/utils';
import { Checkbox } from '$lib/components/ui/checkbox/index.js';
import LogLevel from '$lib/components/LogLevel.svelte';

export interface Logs {
  logs: Log[];
  totalLogs: number;
  page: number;
  pageSize: number;
}

export const columns: ColumnDef<Log>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      renderComponent(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        controlledChecked: true,
        'aria-label': 'Select all'
      }),
    cell: ({ row }) =>
      renderComponent(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        controlledChecked: true,
        'aria-label': 'Select row'
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'logLevel',
    header: 'Level',
    cell: ({ row }) => {
      return renderComponent(LogLevel, { level: row.original.logLevel });
    }
  },
  {
    accessorKey: 'serverName',
    header: 'Server',
    cell: ({ row }) => {
      const serverNameCellSnippet = createRawSnippet<[Date]>((getServerName) => {
        const serverName = getServerName();
        return {
          render: () => `<span class="font-bold text-foreground">${serverName}</span>`
        };
      });

      return renderSnippet(serverNameCellSnippet, row.getValue('serverName'));
    }
  },
  {
    accessorKey: 'logTimestamp',
    header: 'Timestamp',
    cell: ({ row }) => {
      const timestampCellSnippet = createRawSnippet<[Date]>((getTimesatmp) => {
        const timestamp = getTimesatmp();
        return {
          render: () =>
            `<span class="font-medium text-muted-foreground">${formatTimestamp(timestamp)}</span>`
        };
      });

      return renderSnippet(timestampCellSnippet, row.getValue('logTimestamp'));
    }
  },
  {
    accessorKey: 'logSource',
    header: 'Source',
    cell: ({ row }) => {
      const sourceCellSnippet = createRawSnippet<[Date]>((getSource) => {
        const source = getSource();
        return {
          render: () => `<span class="font-mono">${source}</span>`
        };
      });

      return renderSnippet(sourceCellSnippet, row.getValue('logSource'));
    }
  },
  {
    accessorKey: 'logMessage',
    header: 'Message'
  }
];

export const columnsPrettyNames = {
  logLevel: 'Level',
  serverName: 'Server name',
  logTimestamp: 'Timestamp',
  logSource: 'Source',
  logMessage: 'Message',
  logId: 'ID',
  serverId: 'Server ID',
  serverUrl: 'Server URL',
};
