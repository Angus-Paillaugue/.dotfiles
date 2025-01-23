export class TextReveal {
	#finalValue;

	// eslint-disable-next-line no-undef
	#value = $state('');
	#revealed;
	#speed;
	#interval = null;
	#delay;

	constructor({ text, speed = 3000, delay }) {
		this.#finalValue = text;
		this.#revealed = false;
		this.#speed = speed;
		this.#delay = delay; // New delay property
		this.#interval = null;
		this.startAnimation();
	}

	get revealed() {
		return this.#revealed;
	}

	get value() {
		return this.#value;
	}

	startAnimation() {
		// Extract text segments between HTML tags using regex
		const segments = this.#extractTextSegments(this.#finalValue);

		// During delay phase, replace each segment with random characters
		const delayInterval = setInterval(() => {
			segments.forEach((segment) => {
				segment.current = this.#getRandomString(segment.original.length);
			});
			this.#updateValue(segments);
		}, 50);

		// After the delay, start the reveal animation
		setTimeout(() => {
			clearInterval(delayInterval);
			this.#animate(segments);
		}, this.#delay);
	}

	#animate(segments) {
		const totalSteps = segments.reduce((sum, segment) => sum + segment.original.length, 0);
		let currentStep = 0;

		const intervalTime = Math.min(this.#speed / totalSteps, 1000); // Ensure minimum interval of 10ms
		this.#interval = setInterval(() => {
			let steps = 0;

			segments.forEach((segment) => {
				const revealLength = Math.min(segment.original.length, currentStep - steps);
				const revealedText = segment.original.slice(0, revealLength);
				const randomText = this.#getRandomString(segment.original.length - revealLength);

				segment.current = revealedText + randomText;
				steps += segment.original.length;
			});

			this.#updateValue(segments);

			if (currentStep < totalSteps) {
				currentStep++;
			} else {
				this.#revealed = true;
				clearInterval(this.#interval);
				this.#value = this.#finalValue; // Set final value once revealed
			}
		}, intervalTime);
	}

	#extractTextSegments(html) {
		// Match text between tags
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

	#updateValue(segments) {
		let updatedHTML = this.#finalValue;
		// Replace each text segment in the HTML with the animated version
		segments.reverse().forEach((segment) => {
			updatedHTML =
				updatedHTML.slice(0, segment.start) + segment.current + updatedHTML.slice(segment.end);
		});
		this.#value = updatedHTML;
	}

	#getRandomString(length) {
		return Array.from({ length }, () =>
			String.fromCharCode(33 + Math.floor(Math.random() * 94))
		).join('');
	}
}
