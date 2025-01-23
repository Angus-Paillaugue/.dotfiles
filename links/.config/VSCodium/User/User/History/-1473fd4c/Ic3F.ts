export class Terminal {
	static DELIMITERS = {
		'[BG-RED]': 'bg-red-500 text-neutral-100',
		'[BG-GREEN]': 'bg-green-500 text-neutral-100',
		'[BG-BLUE]': 'bg-blue-500 text-neutral-100',
		'[BG-YELLOW]': 'bg-yellow-500 text-neutral-100',
		'[BG-PURPLE]': 'bg-purple-500 text-neutral-100',
		'[BG-CYAN]': 'bg-cyan-500 text-neutral-100',
		'[BG-WHITE]': 'bg-neutral-100 text-neutral-900',
		'[BG-BLACK]': 'bg-neutral-900 text-neutral-100',
		'[BG-GRAY]': 'bg-neutral-500 text-neutral-100',
		'[RED]': 'text-red-500',
		'[GREEN]': 'text-green-500',
		'[BLUE]': 'text-blue-500',
		'[YELLOW]': 'text-yellow-500',
		'[PURPLE]': 'text-purple-500',
		'[CYAN]': 'text-cyan-500',
		'[WHITE]': 'text-neutral-100',
		'[BLACK]': 'text-neutral-900',
		'[GRAY]': 'text-neutral-500',
		'[BOLD]': 'font-extrabold'
	};

	private input = $state<string>('');
	private PROMPT: string = '[GREEN][BOLD]&gt;[/BOLD][/GREEN]';
	private lookingForCommandIndex: number = -1;
	private caretPosition = $state<number>(0);
	private terminalValue = $state<string[]>([]);

	constructor(commands, prompt = this._PROMPT) {
		this._PROMPT = prompt;
		this.COMMANDS = {
			help: {
				description: 'Displays a list of available commands.',
				callback: () => {
					this.terminalPush('Available commands:');
					for (const [command, { description }] of Object.entries(this.COMMANDS)) {
						this.terminalPush(`  ${command}`);
						this.terminalPush(`    [GRAY]${description}`);
					}
				}
			},
			clear: {
				description: 'Clears the terminal screen.',
				callback: () => {
					this.resetTerminal();
				}
			},
			echo: {
				description: 'Prints a message to the terminal.',
				callback: (...args) => {
					this.terminalPush(args.join(' '));
				}
			},
			...commands
		};

		this.addWelcomeMessage();
	}

	get input() {
		return this._input;
	}
	set input(value) {
		this._input = value;
	}
	get prompt() {
		return this._PROMPT;
	}
	set prompt(value) {
		this._PROMPT = value;
	}
	get terminalValue() {
		return this.#terminalValue;
	}
	set terminalValue(value) {
		this.#terminalValue = value;
	}
	get commands() {
		return this.COMMANDS;
	}
	set commands(value) {
		this.COMMANDS = value;
	}
	get caretPosition() {
		return this.#caretPosition;
	}
	set caretPosition(value) {
		this.#caretPosition = value;
	}

	/**
	 * Handles the this._input event.
	 *
	 * @param {Event} e - The this._input event object.
	 */
	handleInput(e) {
		const key = e.key;

		if (key === 'Enter') {
			if (this._input === '') return;
			this.runCommand(this._input.trim());
			this._input = '';
			this.#lookingForCommandIndex = -1;
			this.#caretPosition = 0;
		} else if (key === 'Backspace') {
			if (this._input.length === 0) return;
			if (e.ctrlKey || e.metaKey) {
				const index = this._input.lastIndexOf(' ', this.#caretPosition - 1);
				if (index === -1) {
					this._input = this._input.slice(this.#caretPosition);
					this.#caretPosition = 0;
				} else {
					this._input = this._input.slice(0, index) + this._input.slice(this.#caretPosition);
					this.#caretPosition = index;
				}
			} else {
				this._input =
					this._input.slice(0, this.#caretPosition - 1) + this._input.slice(this.#caretPosition);
				this.#caretPosition = Math.max(0, this.#caretPosition - 1);
			}
		} else if (key === 'Delete') {
			if (this._input.length === 0) return;
			if (e.ctrlKey || e.metaKey) {
				const index = this._input.indexOf(' ', this.#caretPosition);
				if (index === -1) {
					this._input = this._input.slice(0, this.#caretPosition);
				} else {
					this._input = this._input.slice(0, this.#caretPosition) + this._input.slice(index + 1);
				}
			} else {
				this._input =
					this._input.slice(0, this.#caretPosition) + this._input.slice(this.#caretPosition + 1);
			}
		} else if (!e.altKey && !e.ctrlKey && !e.metaKey && key.length === 1) {
			this._input =
				this._input.slice(0, this.#caretPosition) + key + this._input.slice(this.#caretPosition);
			this.#caretPosition++;
		} else if (key === 'Tab') {
			e.preventDefault();
		} else if (key === 'ArrowUp') {
			e.preventDefault();
			this.#lookingForCommandIndex++;
			this._input = this.getCommand();
			this.#caretPosition = this._input.length;
		} else if (key === 'ArrowDown') {
			e.preventDefault();
			if (this.#lookingForCommandIndex === -1) {
				this._input = '';
				this.#caretPosition = 0;
				return;
			}
			this.#lookingForCommandIndex--;
			this._input = this.getCommand();
			this.#caretPosition = this._input.length;
		} else if (key === 'ArrowLeft') {
			this.#caretPosition = Math.max(0, this.#caretPosition - 1);
		} else if (key === 'ArrowRight') {
			this.#caretPosition = Math.min(this._input.length, this.#caretPosition + 1);
		}
	}

	/**
	 * Generates a formatted prompt string.
	 *
	 * @param {string} [val=""] - The initial value for the prompt.
	 * @returns {string} The generated prompt string.
	 */
	getPrompt(val = '') {
		if (Object.keys(this.COMMANDS).includes(val.split(' ')[0])) {
			return (
				'{command}' +
				this._PROMPT +
				'[GREEN] ' +
				val.split(' ')[0] +
				'[/GREEN] ' +
				val.split(' ').slice(1).join(' ')
			);
		} else {
			return (
				'{command}' +
				this._PROMPT +
				'[RED] ' +
				val.split(' ')[0] +
				'[/RED] ' +
				val.split(' ').slice(1).join(' ')
			);
		}
	}

	/**
	 * Retrieves the command this._input by the user.
	 * This function is responsible for capturing and processing
	 * the command entered in the terminal interface.
	 *
	 * @returns {string} The command entered by the user.
	 */
	getCommand() {
		if (this.terminalValue.length === 0) {
			return '';
		}
		const commands = this.terminalValue
			.filter((line) => line.startsWith('{command}'))
			.map((line) => line.replace('{command}', ''))
			.reverse();
		this.#lookingForCommandIndex = Math.min(this.#lookingForCommandIndex, commands.length - 1);

		return this.#stripLine(
			commands[this.#lookingForCommandIndex] || commands.at(-1) || this._input
		);
	}

	/**
	 * Strips color or prompt formatting from a terminal line.
	 *
	 * @param {string} line - The line of text to be stripped.
	 * @returns {string} - The stripped line of text.
	 */
	#stripLine(line) {
		line = line.replace('{command}', '');
		line = line.replace(this._PROMPT, '');
		const matches = line.match(/\[\/?[A-Z]+\]/g);
		if (matches) {
			return matches
				.reduce((acc, match) => {
					if (match.startsWith('[/')) {
						return acc.replace(match, '');
					} else {
						return acc.replace(match, '');
					}
				}, line)
				.trim();
		} else {
			return line.trim();
		}
	}

	/**
	 * Pushes a value to the terminal.
	 *
	 * @param {string} value - The value to be pushed to the terminal. Defaults to a single space if not provided.
	 */
	terminalPush(value = ' ') {
		this.terminalValue.push(value || this._input);
	}

	/**
	 * Resets the terminal to its initial state.
	 * This function clears the terminal screen and resets any state variables
	 * to their default values.
	 */
	resetTerminal(addWelcome = false) {
		this.#lookingForCommandIndex = -1;
		this.terminalValue = [];
		if(addWelcome) this.addWelcomeMessage();
	}

	/**
	 * Executes a given command in the terminal.
	 *
	 * @param {string} command - The command to be executed.
	 */
	runCommand(command) {
		const [cmd, ...args] = command.split(' ');
		this.terminalPush(this.getPrompt(this._input));
		if (!this.COMMANDS[cmd]) {
			this.terminalPush(`Command not found: ${cmd}`);
			return;
		}
		try {
			this.COMMANDS[cmd].callback(...args);
		} catch (_e) {
			delete _e.stack;
			this.terminalPush(`[RED]Error running command[/RED]: ${cmd}`);
		}
	}

	/**
	 * Adds a welcome message to the terminal website.
	 */
	addWelcomeMessage() {
		this.terminalPush(`Welcome to my terminal website!`);
		this.terminalPush(`Type [BG-WHITE]'help'[/BG-WHITE] to see available commands.`);
	}

	/**
	 * Parses a given terminal line and converts it's formatting into HTML.
	 *
	 * @param {string} line - The terminal line to be parsed.
	 * @returns {void}
	 */
	parseTerminalLine(line) {
		line = line.replace('{command}', '');
		const WRAPPING_TAGS = ['<span class="font-mono whitespace-pre text-wrap block">', '</span>'];
		const matches = line.match(/\[\/?[A-Z-]+\]/g);
		if (matches) {
			let openTags = [];
			return (
				WRAPPING_TAGS[0] +
				matches.reduce((acc, match) => {
					if (match.startsWith('[/')) {
						return acc.replace(match, '</span>');
					} else {
						const color = Terminal.DELIMITERS[match];
						openTags.push(color);
						return acc.replace(
							match,
							`<span class="${color}${match.startsWith('[BG') ? ' rounded' : ''}">`
						);
					}
				}, line) +
				WRAPPING_TAGS[1]
			);
		} else {
			return WRAPPING_TAGS[0] + line + WRAPPING_TAGS[1];
		}
	}

	/**
	 * Checks if the given line is a command.
	 *
	 * @param {string} line - The line to check.
	 * @returns {boolean} - Returns true if the line starts with '{command}', otherwise false.
	 */
	isCommand(line) {
		return line.startsWith('{command}');
	}
}
