<script lang="ts">
	import {
		Pause,
		Play,
		SkipBack,
		SkipForward,
		ChevronDown
	} from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import Cover from '../Cover.svelte';
  import { formatTime } from '$lib/utils';
	import { currentlyPlayingSong, songsToPlay } from '$lib/stores';
	import Track from '../Track/Track.svelte';
	import { Link } from '$lib/components/';
	import { Player } from './player.svelte';

  interface Props {
    player: Player;
    isPlayerFullScreen: boolean;
    trackTooltipTime: number;
  }

  let { player = $bindable(), isPlayerFullScreen = $bindable(false), trackTooltipTime = $bindable(-1) }: Props = $props();
  let playerMouseDown = $state(-1);
  let playerDragMove = $state(0);

	function onProgressBarClick(e: MouseEvent) {
		if (!player?.song) return;
		trackTooltipTime = -1;
		const progressX = e.offsetX;
		const progressPercentage = progressX / (e.currentTarget as HTMLDivElement).clientWidth;
		const skitToSongDuration = player.song.duration * progressPercentage;
		player.currentTime = skitToSongDuration;
	}

  function onPlayerMouseDown(e: MouseEvent) {
    playerMouseDown = e.offsetX;
  }

  function onPlayerMouseUp(e: MouseEvent) {
    playerMouseDown = -1;
  }

  function onPlayerMouseMove(e: MouseEvent) {
    if (playerMouseDown < 0) return;
    const progressX = e.offsetX - playerMouseDown;
    if(Math.abs(progressX) < window.innerWidth / 3) {
      playerDragMove = progressX;
      return;
    }

    if(progressX > 0) {
      player?.previous();
    } else {
      player?.next();
    }

    playerMouseDown = -1;
  }
</script>

{#if isPlayerFullScreen && $currentlyPlayingSong && player?.song}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="absolute inset-0 z-20 bg-background" transition:fly={{ y: '100%', duration: 300 }} onmousedown={onPlayerMouseDown} onmouseup={onPlayerMouseUp} onmousemove={onPlayerMouseMove} ondrag={onPlayerMouseMove} ondragstart={onPlayerMouseDown} ondragend={onPlayerMouseUp}>
		<div
			class="no-scrollbar mx-auto flex h-full w-full max-w-screen-xl flex-col gap-4 overflow-y-auto p-4 md:p-8 md:pb-[5.5rem] lg:grid lg:grid-cols-2"
		>
			<div class="flex flex-row items-center md:hidden">
				<button
					class="size-10 rounded-full p-2 transition-all"
					onclick={() => {
						isPlayerFullScreen = false;
					}}
				>
					<ChevronDown class="size-full" />
				</button>
			</div>
			<!-- Detail and mobile controls -->
			<div class="flex flex-col">
				{#key player.song}
          <div class="w-full relative aspect-square">
            <Cover song={player.song} class="size-full object-cover rounded-xl" />
          </div>
				{/key}
				<h1 class="mt-4 text-2xl font-medium">
					{player.song.title}
				</h1>
				<Link href="/artist/{player.song.artist.id}">
					<h2 class="text-lg text-muted">{player.song.artist.name}</h2>
				</Link>

				<div class="mt-4 flex w-full flex-col items-center gap-6 md:hidden">
					<div class="flex w-full flex-row items-center justify-evenly">
						<button
							onclick={() => player?.previous()}
							class="size-10 rounded-full p-2 transition-all hover:bg-background"
						>
							<SkipBack class="size-full hover:fill-foreground" />
						</button>
						<button
							onclick={() => player?.togglePlay()}
							class="size-16 rounded-full bg-foreground p-4 text-background transition-all"
						>
							{#if player.isPlaying}
								<span in:scale class="size-full">
									<Pause class="size-full fill-current" />
								</span>
							{:else}
								<span in:scale class="size-full">
									<Play class="size-full fill-current" />
								</span>
							{/if}
						</button>
						<button
							onclick={() => player?.next()}
							class="size-10 rounded-full p-2 transition-all hover:bg-background"
						>
							<SkipForward class="size-full hover:fill-foreground" />
						</button>
					</div>
					<!-- Progress -->
					<div class="flex w-full flex-col gap-1">
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="bg-accent h-2 w-full overflow-hidden rounded-full bg-secondary/50"
							onclick={onProgressBarClick}
						>
							<div
								class="h-full bg-foreground transition-[width] duration-100 ease-linear"
								style="width: {player?.percentage}%"
							></div>
						</div>
						<div class="flex flex-row items-center justify-between">
							<p class="font-mono text-sm text-muted">{formatTime(player.currentTime)}</p>
							<p class="font-mono text-sm text-muted">{formatTime(player.song.duration)}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Songs list -->
			<div class="max-md:max-h-1/2 no-scrollbar flex shrink-0 flex-col overflow-y-auto max-md:mt-8">
				<h2 class="text-lg font-medium">Up next</h2>
				{#each $songsToPlay as song}
					<Track {song} />
				{/each}
			</div>
		</div>
	</div>
{/if}
