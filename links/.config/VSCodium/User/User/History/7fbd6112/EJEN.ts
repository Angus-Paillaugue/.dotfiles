interface Options {
	text: string;
	delay: number;
}

export class TextReveal {
	static CHAR_REVEAL_SPEED = 50;
	private _finalValue: string;
	private _value = $state<string>('');
	private _revealed: boolean;
	private _interval: null | number = null;
	private delay: number;

	constructor({ text, delay }: Options) {
		this._finalValue = text;
		this._revealed = false;
		this.delay = delay;
		this._interval = null;
		this.startAnimation();
	}

	get revealed(): boolean {
		return this._revealed;
	}

	get value(): string {
		return this._value;
	}

	startAnimation() {
		const segments = this.extractTextSegments(this._finalValue);

		const delayInterval = setInterval(() => {
			segments.forEach((segment) => {
				segment.current = this.getObfuscatedString(segment.original);
			});
			this.updateValue(segments);
		}, 50);

		setTimeout(() => {
			clearInterval(delayInterval);
			this.animate(segments);
		}, this.delay);
	}

	private animate(segments) {
		const totalSteps = segments.reduce((sum, segment) => sum + segment.original.length, 0);
		let currentStep = 0;

		this._interval = setInterval(() => {
			let remainingSteps = currentStep;
			segments.forEach((segment) => {
				const revealLength = Math.min(segment.original.length, remainingSteps);
				const revealedText = segment.original.slice(0, revealLength);
				const randomText = this.getObfuscatedString(segment.original.slice(revealLength));

				segment.current = revealedText + randomText;
				remainingSteps = Math.max(0, remainingSteps - segment.original.length);
			});

			this.updateValue(segments);

			if (currentStep < totalSteps) {
				currentStep++;
			} else {
				this._revealed = true;
				clearInterval(this._interval);
				this._value = this._finalValue;
			}
		}, TextReveal.CHAR_REVEAL_SPEED);
	}

	private extractTextSegments(html: string): string {
		const regex = />([^<]+)</g;
		const segments = [];
		let match;

		while ((match = regex.exec(html)) !== null) {
			const start = match.index + 1;
			const end = regex.lastIndex - 1;
			const original = match[1];

			segments.push({ original, current: '', start, end });
		}

		return segments;
	}

	private updateValue(segments) {
		let updatedHTML = this._finalValue;
		segments.reverse().forEach((segment) => {
			updatedHTML =
				updatedHTML.slice(0, segment.start) + segment.current + updatedHTML.slice(segment.end);
		});
		this._value = updatedHTML;
	}

	private getObfuscatedString(text: string): string {
		return Array.from(text)
			.map((char) => (char === ' ' ? ' ' : this.getRandomChar()))
			.join('');
	}

	private getRandomChar() {
		return String.fromCharCode(33 + Math.floor(Math.random() * 94));
	}

	static charLength(str: string): number {
		return str.replace(/<[^>]*>/g, '').length;
	}
}
