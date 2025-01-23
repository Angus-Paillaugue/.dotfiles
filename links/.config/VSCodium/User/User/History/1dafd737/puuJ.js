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
    if(this.#revealed) {
      return;
    }
    if(this.#delay === 0) {
      this.animate();
      return;
    }
		// Start with the delay phase
		const delayInterval = setInterval(() => {
			// Show only random characters during the delay
			this.#value = Array.from({ length: this.#finalValue.length }, () =>
				String.fromCharCode(33 + Math.floor(Math.random() * 94))
			).join('');
		}, 50); // Fast update for random effect during delay

		// After the delay, start the reveal animation
		setTimeout(() => {
			clearInterval(delayInterval);
			this.animate();
		}, this.#delay);
	}

	animate() {
		if (this.#revealed) {
			return;
		}

		const totalSteps = this.#finalValue.length;
		let currentStep = 0;

		this.#interval = setInterval(() => {
			// Reveal actual characters up to the current step
			const revealedText = this.#finalValue.slice(0, currentStep);
			// Generate random characters for the remaining part
			const randomText = String.fromCharCode(33 + Math.floor(Math.random() * 94));

			this.#value = revealedText + randomText;

			if (currentStep < totalSteps) {
				currentStep++;
			} else {
				this.#revealed = true;
				clearInterval(this.#interval);
				this.#value = this.#finalValue; // Set final value once revealed
			}
		}, this.#speed / totalSteps);
	}
}
