<script lang="ts">
  import FullScreenPlayer from './full-screen-player.svelte';
	import { onMount } from 'svelte';
	import { Player } from './player.svelte';
	import type { Song } from '$lib/types';
	import {
		Pause,
		Play,
		SkipBack,
		SkipForward,
		EllipsisVertical,
		Plus
	} from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import Title from './title.svelte';
	import { cn, formatTime } from '$lib/utils';
	import Cover from '../Cover.svelte';
	import { currentlyPlayingSong, isPlayingSong } from '$lib/stores';
	import AddToPlaylist from '../add-to-playlist.svelte';
	import { afterNavigate } from '$app/navigation';
	import { Link, Dropdown } from '$lib/components/';

	let player = $state<Player>();
	let isPlayerFullScreen = $state<boolean>(false);
	let addCurrentSongToPlaylistModal = $state<boolean>(false);
	let trackTooltipTime = $state<number>(-1);

	onMount(() => {
		player = new Player(document.body);
		player.on('songChange', (song: Song | null) => {
			if (!song) return;
			$currentlyPlayingSong = song;
			$isPlayingSong = true;
		});

		player.on('play', () => {
			if (!player?.song) return;
			$isPlayingSong = true;
		});

		player.on('pause', () => {
			if (!player?.song) return;
			$isPlayingSong = false;
		});

		return () => {
			player?.destroy();
		};
	});

	// Changing the song playing when clicking in the list
	$effect(() => {
		if ($currentlyPlayingSong) player?.changeSong($currentlyPlayingSong);
	});

	function onProgressBarClick(e: MouseEvent) {
		if (!player?.song) return;
		trackTooltipTime = -1;
		const progressX = e.offsetX;
		const progressPercentage = progressX / (e.currentTarget as HTMLDivElement).clientWidth;
		const skitToSongDuration = player.song.duration * progressPercentage;
		player.currentTime = skitToSongDuration;
	}

	function onWindowKeyDown(e: KeyboardEvent) {
		if (!player?.song) return;
		// If is focused on an input, don't trigger the shortcuts
		if (document.activeElement?.tagName === 'INPUT') return;

		switch (e.key) {
			case ' ': {
				e.preventDefault();
				player.togglePlay();
				break;
			}
			case 'ArrowRight': {
				player.currentTime += 5;
				break;
			}
			case 'ArrowLeft': {
				player.currentTime -= 5;
				break;
			}
			case 'N': {
				if (e.shiftKey) player.next();
				break;
			}
			case 'P': {
				if (e.shiftKey) player.previous();
				break;
			}
		}
	}

	afterNavigate(() => {
		isPlayerFullScreen = false;
	});
</script>

{#if $currentlyPlayingSong}
	<AddToPlaylist bind:open={addCurrentSongToPlaylistModal} song={$currentlyPlayingSong} />
{/if}

<svelte:window onkeydown={onWindowKeyDown} />

<!-- Song detail on full screen -->
<FullScreenPlayer bind:isPlayerFullScreen bind:trackTooltipTime />

<!-- Main player -->
{#if $currentlyPlayingSong && player?.song}
	<div
		class={cn(
			'flex w-full shrink-0 flex-row items-center justify-center bg-background transition-transform duration-300',
			isPlayerFullScreen ? 'max-md:translate-y-full' : ''
		)}
		transition:fly={{ y: '100%', duration: 300 }}
	>
		<div class="z-20 mx-auto w-full max-w-screen-xl shrink-0 bg-background p-2">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="text-text flex h-[4.5rem] w-full flex-col rounded-lg bg-secondary">
				<!-- Progress bar -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="bg-accent relative h-2 w-full rounded-t-lg transition-colors hover:bg-background/50"
					onclick={onProgressBarClick}
					onmousemove={(e) => {
						if (!player?.song) return;
						const progressX = e.offsetX;
						const progressPercentage = progressX / (e.currentTarget as HTMLDivElement).clientWidth;
						trackTooltipTime = player.song.duration * progressPercentage;
					}}
					onmouseleave={() => {
						trackTooltipTime = -1;
					}}
				>
					{#if trackTooltipTime >= 0}
						<div
							class="tex-xs text-text absolute bottom-full z-10 mb-1 -translate-x-1/2 rounded-md border border-border bg-background px-2 py-1 font-mono"
							style="left: {(trackTooltipTime / player.song.duration) * 100}%"
						>
							{formatTime(trackTooltipTime)}
						</div>
					{/if}
					<div class="h-full w-full overflow-hidden rounded-t-lg">
						<div
							class="h-full bg-foreground transition-[width] duration-100 ease-linear"
							style="width: {player.percentage}%"
						></div>
					</div>
				</div>

				<div
					class="flex h-full w-full grow flex-row-reverse items-center justify-between gap-2 px-2 md:flex-row md:px-4"
				>
					<!-- Left controls -->
					<div class="flex flex-col items-center gap-1 md:flex-row md:gap-4">
						<div class="flex items-center">
							<button
								onclick={() => player?.previous()}
								class="size-10 rounded-full p-2 transition-all hover:bg-background max-md:hidden"
							>
								<SkipBack class="size-full hover:fill-foreground" />
							</button>
							<button
								onclick={() => player?.togglePlay()}
								class="size-10 rounded-full p-2 ring-background transition-all hover:bg-background hover:ring-4"
							>
								{#if player?.isPlaying}
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
								class="size-10 rounded-full p-2 transition-all hover:bg-background max-md:hidden"
							>
								<SkipForward class="size-full hover:fill-foreground" />
							</button>
						</div>
						<p class="font-mono text-sm text-muted max-md:hidden">
							{formatTime(player.currentTime)} / {formatTime(player.song.duration)}
						</p>
					</div>

					<!-- Song details -->
					<button
						class="md: flex w-1/2 flex-row items-center justify-start gap-4 text-start max-md:grow"
						onclick={(e) => {
							const target = e.target as HTMLElement;
							if (target.closest('a')) return;
							isPlayerFullScreen = !isPlayerFullScreen;
						}}
					>
						{#key player.song}
							<Cover song={player.song} class="aspect-square h-12 w-auto rounded-md object-cover" />
						{/key}
						<div
							class="flex flex-col items-start justify-between gap-1 text-start max-md:grow md:text-center"
						>
							<Title title={player.song.title ?? ''} />
							<Link class="text-muted" href="/artist/{player.song.artist.id}">
								<p class="text-sm leading-6">{player.song.artist.name}</p>
							</Link>
						</div>
					</button>

					<Dropdown position="top" align="end">
						<Dropdown.Trigger
							variant="none"
							class="size-8 shrink-0 rounded-full p-2 transition-all hover:bg-background max-md:hidden"
						>
							<EllipsisVertical class="size-full" />
						</Dropdown.Trigger>
						{#snippet items()}
							<Dropdown.Item
								href="/"
								class=""
								name="Add to playlist"
								onclick={() => {
									addCurrentSongToPlaylistModal = true;
								}}
							>
								<Plus class="size-4" />
								Add to playlist
							</Dropdown.Item>
						{/snippet}
					</Dropdown>
				</div>
			</div>
		</div>
	</div>
{/if}
