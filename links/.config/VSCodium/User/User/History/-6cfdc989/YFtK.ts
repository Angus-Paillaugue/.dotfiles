import type { Song } from "$lib/types";
import { formatProgress } from "$lib/utils";

export class Player {
	private _playerElement: HTMLAudioElement;
	private _interval: NodeJS.Timeout | number | null = null;
	private _song = $state<Song|null>(null);
	private _currentTime = $state<number>(0);
	private _percentage = $state<number>(0);
	private _isPlaying = $state<boolean>(false);

	play() {
		this._playerElement.play();
		this._isPlaying = true;
		this._playerElement.addEventListener('timeupdate', () => {this.onUpdateTime()});
	}

	pause() {
		this._playerElement.pause();
		this._isPlaying = false;
		this._playerElement.removeEventListener('timeupdate', () => {this.onUpdateTime()});
	}

	constructor(parent: HTMLElement) {
		const audioComponent = document.createElement('audio');
		if (this._song) audioComponent.src = this._song.path;
		audioComponent.controls = false;
		audioComponent.autoplay = false;
		parent.appendChild(audioComponent);
		this._playerElement = audioComponent;
	}

	get isPlaying() {
		return this._isPlaying;
	}

	get song() {
		return this._song;
	}

	get currentTime() {
		return this._currentTime;
	}

	set currentTime(value: number) {
		this._currentTime = value;
		this._playerElement.currentTime = value;
	}

	get volume() {
		return this._playerElement.volume;
	}

	set volume(value: number) {
		this._playerElement.volume = value;
	}

	get muted() {
		return this?._playerElement.muted;
	}

	set muted(value: boolean) {
		this._playerElement.muted = value;
	}

	get percentage() {
		return this._percentage;
	}

	prettyProgress() {
		if (!this._song) return;
		return formatProgress(this._currentTime, this._song.duration);
	}

	togglePlay() {
		if(!this._song) return;
		if (this.isPlaying) this.pause();
		else this.play();
	}

	onUpdateTime() {
		this._percentage = (this._playerElement.currentTime / this._playerElement.duration) * 100;
		this._currentTime = Math.floor(this._playerElement.currentTime);
	}

	changeSong(song: Song) {
		this._song = song;
		this._playerElement.src = this._song.path;
		this._playerElement.load();
		this.play();
	}

	destroy() {
		if (this._interval) clearInterval(this._interval);
		this._playerElement.remove();
	}
}
