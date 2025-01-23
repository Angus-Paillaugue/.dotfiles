export class TextReveal {
	#finalValue;

	// eslint-disable-next-line no-undef
	#value = $state('');
	#revealed;
	#speed;

	constructor({ text, speed }) {
		this.#finalValue = text;
		this.#revealed = false;
		this.#speed = speed;
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

		const interval = setInterval(() => {
			if (this.#value.length < this.#finalValue.length) {
				this.#value += this.#finalValue[this.#value.length];
			} else {
				this.#revealed = true;
				clearInterval(interval);
			}
		}, this.#speed / this.#finalValue.length);
	}
}
