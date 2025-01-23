<script lang="ts">
  import BentoSQL from './SQL.svelte';
  import BentoDocker from './Docker/Docker.svelte';
  import { Timer, TriangleAlert, Info, OctagonAlert } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import Reveal from '../Reveal.svelte';

  class PeriodicLogs {
    logList: { title: string; description: string; icon: any; color: string; id: string }[] =
      $state([]);
    interval: ReturnType<typeof setInterval> | null;
    MAX_NUMBER_OF_LOGS = 5;
    lastIndex: number = -1;
    possibleLogs = [
      {
        title: 'Error',
        description: 'An error occurred while processing the request.',
        icon: OctagonAlert,
        color: 'text-red-600'
      },
      {
        title: 'Warning',
        description: 'Pruning old data is taking an unexpected amount of time.',
        icon: TriangleAlert,
        color: 'text-amber-600'
      },
      {
        title: 'Info',
        description: 'A new order has just been submitted.',
        icon: Info,
        color: 'text-blue-600'
      },
      {
        title: 'Error',
        description: 'Server has timed out.',
        icon: OctagonAlert,
        color: 'text-red-600'
      },
      {
        title: 'Warning',
        description: 'A request has been made to the server from an unknown IP.',
        icon: TriangleAlert,
        color: 'text-amber-600'
      }
    ];

    constructor() {
      this.interval = null;
    }

    addLog() {
      this.lastIndex = (this.lastIndex + 1) % this.possibleLogs.length;
      const newLog = { ...this.possibleLogs[this.lastIndex], id: Math.random().toString() };
      this.logList.unshift(newLog);
      if (this.logs.length > this.MAX_NUMBER_OF_LOGS) {
        this.logList = this.logs.slice(0, this.MAX_NUMBER_OF_LOGS);
      }
    }

    start() {
      this.interval = setInterval(this.addLog.bind(this), 2000);
    }

    stop() {
      if (this.interval) clearInterval(this.interval);
    }

    get logs() {
      return this.logList;
    }
  }

  const logs: PeriodicLogs = new PeriodicLogs();
  let isBentoVisible = $state(false);
  let bentoGrid: HTMLElement | undefined = $state();

  onMount(() => {
    const checkBentoVisibility = () => {
      if (!bentoGrid) {
        isBentoVisible = false;
        return;
      }
      const rect = bentoGrid.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      isBentoVisible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    };

    checkBentoVisibility();
    window.addEventListener('scroll', checkBentoVisibility);

    // Add first log to logs list
    logs.addLog();

    return () => {
      window.removeEventListener('scroll', checkBentoVisibility);
    };
  });
</script>

<div class="flex flex-col">
  <Reveal>
    <h2 class="text-center text-4xl font-semibold text-neutral-800 dark:text-neutral-200">Everything You Need</h2>
  </Reveal>
  <Reveal>
    <h3 class="text-center text-lg font-medium text-neutral-600 dark:text-neutral-400">
      Powerful features to help you manage and understand your logs better
    </h3>
  </Reveal>
  <!-- Bento grid -->
  <div class="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3" bind:this={bentoGrid}>
    <!-- Docker -->
    <Reveal>
      <BentoDocker />
    </Reveal>

    <!-- Real time logs -->
    <Reveal>
      <Logs />
    </Reveal>

    <!-- SQL editor -->
    <BentoSQL />
  </div>
</div>
