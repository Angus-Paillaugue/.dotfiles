export class TextReveal {
	#finalValue;

	// eslint-disable-next-line no-undef
	#value = $state('');
	#revealed;
	#speed;
	#interval = null;
	#delay;
	#delimiters;

	constructor({ text, speed = 3000, delay = 0, delimiters = [] }) {
		this.#finalValue = text;
		this.#revealed = false;
		this.#speed = speed;
		this.#delay = delay;
		this.#delimiters = delimiters; // Set the delimiters to omit
		this.animate();
	}

	get revealed() {
		return this.#revealed;
	}

	get value() {
		return this.#value;
	}

	animate() {
		if (this.#revealed) return;

		const totalSteps = this.#finalValue.length;
		let currentStep = 0;

		setTimeout(() => {
			this.#interval = setInterval(() => {
				// Reveal actual character up to the current step
				let revealedText = '';
				let index = 0;

				while (index < currentStep) {
					let matchedDelimiter = false;

					// Check if any delimiter matches the text starting at current index
					for (const delimiter of this.#delimiters) {
						if (this.#finalValue.startsWith(delimiter, index)) {
							// Add delimiter to revealed text directly
							revealedText += delimiter;
							index += delimiter.length;
							matchedDelimiter = true;
							break;
						}
					}

					// If no delimiter matched, reveal the next character
					if (!matchedDelimiter) {
						revealedText += this.#finalValue[index];
						index++;
					}
				}

				// Generate random characters for the remaining part
				const randomText = Array.from({ length: this.#finalValue.length - index }, (_, i) => {
					const remainingIndex = index + i;
					let matchedDelimiter = false;

					// Check if remaining characters should reveal a delimiter
					for (const delimiter of this.#delimiters) {
						if (this.#finalValue.startsWith(delimiter, remainingIndex)) {
							matchedDelimiter = true;
							return delimiter;
						}
					}

					return matchedDelimiter
						? this.#finalValue.slice(remainingIndex, remainingIndex + matchedDelimiter.length)
						: String.fromCharCode(33 + Math.floor(Math.random() * 94)); // Characters between '!' and '~'
				}).join('');

				this.#value = revealedText + randomText;

				if (currentStep < totalSteps) {
					currentStep++;
				} else {
					this.#revealed = true;
					clearInterval(this.#interval);
					this.#value = this.#finalValue; // Set final value once revealed
				}
			}, this.#speed / totalSteps);
		}, this.#delay);
	}
}
