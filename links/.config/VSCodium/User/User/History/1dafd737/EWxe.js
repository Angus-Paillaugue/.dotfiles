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
				for (let i = 0; i < currentStep; i++) {
					const char = this.#finalValue[i];
					// Check if char is in delimiters array
					revealedText += this.#delimiters.includes(char) ? char : this.#finalValue[i];
				}

				// Generate random characters for the remaining part
				const randomText = Array.from(
					{ length: this.#finalValue.length - currentStep },
					(_, index) => {
						const char = this.#finalValue[currentStep + index];
						// Check if char should remain or be randomized
						return this.#delimiters.includes(char)
							? char
							: String.fromCharCode(33 + Math.floor(Math.random() * 94));
					}
				).join('');

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
