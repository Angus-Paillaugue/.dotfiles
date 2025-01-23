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

    const obfuscate = (text) => text.replace(/./g, '*');
    this.#value = obfuscate(this.#finalValue);

    const interval = setInterval(() => {
      const nextIndex = this.#value.indexOf('*');
      if (nextIndex !== -1) {
        this.#value = this.#value.substring(0, nextIndex) + this.#finalValue[nextIndex] + this.#value.substring(nextIndex + 1);
      } else {
        this.#revealed = true;
        clearInterval(interval);
      }
    }, this.#speed / this.#finalValue.length);
  }
}
