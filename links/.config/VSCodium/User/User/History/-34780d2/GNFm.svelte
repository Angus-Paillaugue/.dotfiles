<script lang="ts" generics="TData, TValue">
 import {
  type ColumnDef,
  type PaginationState,
  getCoreRowModel,
  getPaginationRowModel,
 } from "@tanstack/table-core";

 type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
 };

 let { data, columns }: DataTableProps<TData, TValue> = $props();

 let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });

 const table = createSvelteTable({
  get data() {
   return data;
  },
  columns,
  state: {
   get pagination() {
    return pagination;
   },
  },
  onPaginationChange: (updater) => {
   if (typeof updater === "function") {
    pagination = updater(pagination);
   } else {
    pagination = updater;
   }
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
 });
</script>
