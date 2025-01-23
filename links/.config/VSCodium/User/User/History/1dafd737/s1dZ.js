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
		// Initial random character effect on all text nodes within HTML structure
		const parsedHTML = this.#parseHTML(this.#finalValue);
		const textNodes = this.#getTextNodes(parsedHTML);

		// Show random characters on all text nodes during delay phase
		const delayInterval = setInterval(() => {
			textNodes.forEach((node) => {
				node.nodeValue = Array.from({ length: node.textContent.length }, () =>
					String.fromCharCode(33 + Math.floor(Math.random() * 94))
				).join('');
			});
			this.#value = parsedHTML.body.innerHTML;
		}, 50);

		// After delay, start reveal animation on all text nodes
		setTimeout(() => {
			clearInterval(delayInterval);
			this.#animate(textNodes, parsedHTML);
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
