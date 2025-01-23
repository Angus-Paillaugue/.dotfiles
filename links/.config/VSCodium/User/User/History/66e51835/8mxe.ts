import type { Log } from '@shared/types';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import type { ColumnDef } from '@tanstack/table-core';
import { Checkbox } from '$lib/components/ui/checkbox/index.js';
import { createRawSnippet } from 'svelte';
import type { LogLevel } from '@shared/types';
import LogLevelPill from '$lib/components/LogLevel.svelte';

export interface Logs {
  logs: Log[];
  total: number;
  hasMore: boolean;
  page: number;
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
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => {
      const amountCellSnippet = createRawSnippet<[LogLevel]>((getLevel) => {
        const level = getLevel();
        return {
          render: () => <LogLevelPill level="${level}">${level}</LogLevelPill>
        };
      });

      return renderSnippet(amountCellSnippet, row.getValue('level'));
    }
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp'
  },
  {
    accessorKey: 'message',
    header: 'Message'
  }
];
