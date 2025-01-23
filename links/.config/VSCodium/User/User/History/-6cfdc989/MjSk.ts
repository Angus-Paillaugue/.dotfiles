import type { Song } from "$lib/types";

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
		this._playerElement.addEventListener('timeupdate', this.onUpdateTime);
	}

	pause() {
		this._playerElement.pause();
		this._isPlaying = false;
		this._playerElement.removeEventListener('timeupdate', this.onUpdateTime);
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

	togglePlay() {
		if (this.isPlaying) this.pause();
		else this.play();
	}

	onUpdateTime() {
		console.log('updating time');
		this._percentage = (this._currentTime / this._playerElement.duration) * 100;
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
