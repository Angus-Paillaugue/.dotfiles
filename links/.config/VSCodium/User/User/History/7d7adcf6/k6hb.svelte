<script lang="ts">
  import { Database, RefreshCcw } from 'lucide-svelte';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import LogLevel from '$lib/components/LogLevel.svelte';
  import type { LogLevel as LogLevelType } from '@shared/types';
  import Button from '$lib/components/ui/button/button.svelte';
  import { cn } from '$lib/utils';

  const getRandomRecentDate = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));
    return date.toLocaleTimeString();
  }

  const possibleTableLogs: { id: number; status: LogLevelType; timestamp: string; message: string }[] = [
    {
      id: 1254,
      status: 'error',
      timestamp: getRandomRecentDate(),
      message: 'An error occurred while processing the request.'
    },
    {
      id: 1253,
      status: 'warn',
      timestamp: getRandomRecentDate(),
      message: 'Pruning old data is taking an unexpected amount of time.'
    },
    {
      id: 1252,
      status: 'info',
      timestamp: getRandomRecentDate(),
      message: 'A new order has just been submitted.'
    },
    {
      id: 1251,
      status: 'error',
      timestamp: getRandomRecentDate(),
      message: 'Server has timed out.'
    },
    {
      id: 1250,
      status: 'warn',
      timestamp: getRandomRecentDate(),
      message: 'A request has been made to the server from an unknown IP.'
    },
    {
      id: 1249,
      status: 'info',
      timestamp: getRandomRecentDate(),
      message: 'A new order has just been submitted.'
    },
    {
      id: 1248,
      status: 'error',
      timestamp: getRandomRecentDate(),
      message: 'Server has timed out.'
    },
    {
      id: 1247,
      status: 'warn',
      timestamp: getRandomRecentDate(),
      message: 'A request has been made to the server from an unknown IP.'
    },
  ]

  let tableLogs = $state(possibleTableLogs);
  let isRegeneratingLogsTable = $state(false);

  const regenerateLogs = () => {
    isRegeneratingLogsTable = true;
    tableLogs = tableLogs.map((log) => ({
      ...log,
      timestamp: getRandomRecentDate()
    })).sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);

    setTimeout(() => {
      isRegeneratingLogsTable = false;
    }, 300);
  }

  const slqQuery = [
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'SELECT'
        },
        {
          class: 'text',
          text: ' * '
        },
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'FROM'
        },
        {
          class: 'text',
          text: ' logs '
        }
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'WHERE'
        },
        {
          class: 'text',
          text: ' status IN (\n\t\''
        },
        {
          class: 'string',
          text: 'error'
        },
        {
          class: 'text',
          text: '\',\n\t\''
        },
        {
          class: 'string',
          text: 'warn'
        },
        {
          class: 'text',
          text: '\',\n\t\''
        },
        {
          class: 'string',
          text: 'info'
        },
        {
          class: 'text',
          text: '\'\n) '
        },
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'ORDER BY'
        },
        {
          class: 'text',
          text: ' timestamp DESC '
        },
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'LIMIT'
        },
        {
          class: 'string',
          text: ' 8;'
        }
      ]
    },
  ]
</script>

<div
  class="rounded-xl border border-border bg-secondary lg:col-span-3"
>
  <div class="grid gap-4 lg:grid-cols-6 w-full items-center p-4 relative">
    <!-- Editor -->
    <div class="flex flex-col lg:col-span-2">
      <p class="font-medium text-base">SQL Editor</p>
      <div class="border border-border bg-background rounded-lg p-4 h-fit">
      <div class="editor whitespace-pre-wrap font-mono">
        {#each slqQuery as line}
          <p>
            {#each line.children as child}
              <span class="{child.class}">{child.text}</span>
            {/each}
          </p>
        {/each}
      </div>
      </div>
    </div>
    <div class="flex flex-col items-center justift-center">
      <Button
        size="sm"
        class="relative"
        id="border-button"
        style="box-shadow: 0 -1px #d5d4d2 inset;"
        onclick={regenerateLogs}
        disabled={isRegeneratingLogsTable}
      >
        <RefreshCcw class={cn("size-8", isRegeneratingLogsTable && 'animate-spin')} />
        Regenerate
        <!-- <div class="after:content-[''] after:absolute after:-translate-x-1/2 after:-translate-y-1/2 after:top-1/2 after:left-1/2 after:w-[100px] after:background-[conic-gradient(rgba(225,101,64,0)_0%,rgba(225,101,64,.7)_15%,rgba(225,101,64,0) _15.1%)] after:astect-square after:animate-[button-gradient-animate_4s_linear_infinite] after:transition-opacity after:duration-500"></div> -->
        <div class="border-button absolute -inset-1 rounded-lg border border-border"></div>
      </Button>
    </div>
    <!-- Table -->
    <div class="w-full h-full border border-border overflow-hidden rounded-lg flex flex-col bg-background lg:col-span-3">
      <p class="font-medium text-base px-4 py-1">Latest Logs</p>
      <div class="px-4 py-1 border-t border-border grow h-full">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <td class="text-sm px-4 font-medium">ID</td>
              <td class="text-sm px-4 font-medium">Status</td>
              <td class="text-sm px-4 font-medium">Timestamp</td>
              <td class="text-sm px-4 font-medium">Message</td>
            </tr>
          </thead>
          <tbody>
            {#each tableLogs as log, i (log.id)}
              <!-- TODO: Fix animation -->
              <tr in:fade={{ duration:500, delay: 1000 * i }} animate:flip={{ duration: 300 }}>
                <td class="py-2 px-4 text-sm text-thin text-muted-foreground"><p class="line-clamp-2 lg:line-clamp-1">{log.id}</p></td>
                <td class="py-2 px-4 text-sm text-thin text-muted-foreground">
                  <LogLevel level={log.status} class="text-xs py-0.2 px-1" />
                </td>
                <td class="py-2 px-4 text-sm text-thin text-muted-foreground"><p class="line-clamp-2 lg:line-clamp-1">{log.timestamp}</p></td>
                <td class="py-2 px-4 text-sm text-thin text-muted-foreground">
                  <p class="line-clamp-2 lg:line-clamp-1">{log.message}</p>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="p-6 pt-0">
    <span class="text-base font-medium text-neutral-700">
      <Database class="inline size-[18px] align-middle" />
      Query your data ‒ your way.
    </span>
    <span class="text-base text-neutral-500">Streamline your data analysis with our seamless SQL editor. Give everyone in your team the superpowers they need.</span>
  </div>
</div>


<style>
  @keyframes -global-button-gradient-animate {
    100% {
      transform: translate(-50%,-50%) rotate(1turn);
    }
  }
  .editor .keyword {
    @apply text-amber-600;
  }
  .editor .string {
    @apply text-blue-600;
  }

  .border-button {
    -webkit-mask: linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
      mask-composite: add, add;
    mask-composite: xor;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: opacity .45s cubic-bezier(.6,.6,0,1);
  }

  .border-button::after {
    content: "";
    position: absolute;
    background: conic-gradient(rgba(225,101,64,0) 0%,rgba(225,101,64,.7) 15%,rgba(225,101,64,0) 15.1%);
    width: 100%;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    animation: button-gradient-animate 4s linear infinite;
  }
</style>
