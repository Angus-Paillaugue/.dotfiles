export class TextReveal {
	#finalValue;

	// eslint-disable-next-line no-undef
	#value = $state('');
	#revealed;
	#speed;
	#interval = null;
  #delay;

	constructor({ text, speed = 3000, delay = 0 }) {
		this.#finalValue = text;
		this.#revealed = false;
		this.#speed = speed;
    this.#interval = null;
    this.animate();
    this.#delay = delay;
	}

	get revealed() {
		return this.#revealed;
	}

	get value() {
		return this.#value;
	}

	animate() {
		if (this.#revealed) {
			return;
		}

		const totalSteps = this.#finalValue.length;
		let currentStep = 0;
    console.log(this.#delay);

    setTimeout(() => {
      this.#interval = setInterval(() => {
        // Reveal actual character up to the current step
        const revealedText = this.#finalValue.slice(0, currentStep);
        // Generate random characters for the remaining part
        const randomText = Array.from(
          { length: this.#finalValue.length - currentStep },
          () => String.fromCharCode(33 + Math.floor(Math.random() * 94)) // Characters between '!' and '~'
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
