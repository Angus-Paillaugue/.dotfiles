export class TextReveal {
	/**
	 * Speed at which characters are revealed (in milliseconds).
	 * @type {number}
	 * @static
	 */
	static CHAR_REVEAL_SPEED = 50;

	/**
	 * The final text value to be revealed.
	 * @type {string}
	 * @private
	 */
	#finalValue;

	/**
	 * The current value of the text being revealed.
	 * @type {string}
	 * @private
	 */
	#value = $state('');

	/**
	 * Indicates whether the text has been fully revealed.
	 * @type {boolean}
	 * @private
	 */
	#revealed;

	/**
	 * Interval ID for the animation.
	 * @type {number|null}
	 * @private
	 */
	#interval = null;

	/**
	 * Delay before the animation starts (in milliseconds).
	 * @type {number}
	 * @private
	 */
	#delay;

	constructor({ text, delay }) {
		this.#finalValue = text;
		this.#revealed = false;
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
		const segments = this.#extractTextSegments(this.#finalValue);

		const delayInterval = setInterval(() => {
			segments.forEach((segment) => {
				segment.current = this.#getObfuscatedString(segment.original);
			});
			this.#updateValue(segments);
		}, 50);

		setTimeout(() => {
			clearInterval(delayInterval);
			this.#animate(segments);
		}, this.#delay);
	}

	#animate(segments) {
		const totalSteps = segments.reduce((sum, segment) => sum + segment.original.length, 0);
		let currentStep = 0;

		this.#interval = setInterval(() => {
			let remainingSteps = currentStep;
			segments.forEach((segment) => {
				const revealLength = Math.min(segment.original.length, remainingSteps);
				const revealedText = segment.original.slice(0, revealLength);
				const randomText = this.#getObfuscatedString(segment.original.slice(revealLength));

				segment.current = revealedText + randomText;
				remainingSteps = Math.max(0, remainingSteps - segment.original.length);
			});

			this.#updateValue(segments);

			if (currentStep < totalSteps) {
				currentStep++;
			} else {
				this.#revealed = true;
				clearInterval(this.#interval);
				this.#value = this.#finalValue;
			}
		}, TextReveal.CHAR_REVEAL_SPEED);
	}

	#extractTextSegments(html) {
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
		segments.reverse().forEach((segment) => {
			updatedHTML =
				updatedHTML.slice(0, segment.start) + segment.current + updatedHTML.slice(segment.end);
		});
		this.#value = updatedHTML;
	}

	#getObfuscatedString(text) {
		return Array.from(text)
			.map((char) => (char === ' ' ? ' ' : this.#getRandomChar()))
			.join('');
	}

	#getRandomChar() {
		return String.fromCharCode(33 + Math.floor(Math.random() * 94));
	}

	/**
	 * Calculates the length of a string excluding HTML tags.
	 * @param {string} str - The input string.
	 * @returns {number} - The length of the string excluding HTML tags.
	 * @static
	 */
	static charLength(str) {
		return str.replace(/<[^>]*>/g, '').length;
	}
}


/**
 * Class representing a TextReveal animation.
 */
export class TextReveal {
	/**
	 * Creates an instance of TextReveal.
	 * @param {Object} options - Options for the TextReveal instance.
	 * @param {string} options.text - The text to be revealed.
	 * @param {number} options.delay - The delay before the animation starts.
	 */
	constructor({ text, delay }) {
		this.#finalValue = text;
		this.#revealed = false;
		this.#delay = delay;
		this.#interval = null;
		this.startAnimation();
	}

	/**
	 * Gets the revealed status of the text.
	 * @returns {boolean} - True if the text is fully revealed, otherwise false.
	 */
	get revealed() {
		return this.#revealed;
	}

	/**
	 * Gets the current value of the text being revealed.
	 * @returns {string} - The current value of the text.
	 */
	get value() {
		return this.#value;
	}

	/**
	 * Starts the text reveal animation.
	 * @private
	 */
	startAnimation() {
		// Implementation details...
	}

	/**
	 * Animates the text reveal process.
	 * @param {Array<Object>} segments - The segments of text to be revealed.
	 * @private
	 */
	#animate(segments) {
		// Implementation details...
	}

	/**
	 * Extracts text segments from HTML.
	 * @param {string} html - The HTML string to extract text segments from.
	 * @returns {Array<Object>} - An array of text segments.
	 * @private
	 */
	#extractTextSegments(html) {
		// Implementation details...
	}

	/**
	 * Updates the current value of the text being revealed.
	 * @param {Array<Object>} segments - The segments of text to update.
	 * @private
	 */
	#updateValue(segments) {
		// Implementation details...
	}

	/**
	 * Generates an obfuscated string of the same length as the input text.
	 * @param {string} text - The input text to obfuscate.
	 * @returns {string} - The obfuscated string.
	 * @private
	 */
	#getObfuscatedString(text) {
		// Implementation details...
	}

	/**
	 * Generates a random character.
	 * @returns {string} - A random character.
	 * @private
	 */
	#getRandomChar() {
		// Implementation details...
	}

	/**
	 * Calculates the length of a string excluding HTML tags.
	 * @param {string} str - The input string.
	 * @returns {number} - The length of the string excluding HTML tags.
	 * @static
	 */
	static charLength(str) {
		// Implementation details...
	}
}
