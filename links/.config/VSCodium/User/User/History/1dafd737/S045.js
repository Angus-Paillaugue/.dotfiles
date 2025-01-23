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

	#animate(textNodes, parsedHTML) {
		const totalSteps = textNodes.reduce((sum, node) => sum + node.textContent.length, 0);
		let currentStep = 0;

		this.#interval = setInterval(() => {
			let steps = 0;

			textNodes.forEach((node) => {
				// Determine the length of the text to reveal in this node
				const revealLength = Math.min(node.textContent.length, currentStep - steps);
				const revealedText = this.#finalValue.slice(steps, steps + revealLength);

				// Generate random characters for unrevealed portion
				const randomText = Array.from({ length: node.textContent.length - revealLength }, () =>
					String.fromCharCode(33 + Math.floor(Math.random() * 94))
				).join('');

				node.nodeValue = revealedText + randomText;
				steps += node.textContent.length;
			});

			this.#value = parsedHTML.body.innerHTML;

			if (currentStep < totalSteps) {
				currentStep++;
			} else {
				this.#revealed = true;
				clearInterval(this.#interval);
				this.#value = this.#finalValue; // Set final value once revealed
			}
		}, this.#speed / totalSteps);
	}

	#parseHTML(html) {
		const parser = new DOMParser();
		return parser.parseFromString(html, 'text/html');
	}

	#getTextNodes(node) {
		const textNodes = [];
		const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
		let currentNode = treeWalker.nextNode();

		while (currentNode) {
			textNodes.push(currentNode);
			currentNode = treeWalker.nextNode();
		}
		return textNodes;
	}
}
