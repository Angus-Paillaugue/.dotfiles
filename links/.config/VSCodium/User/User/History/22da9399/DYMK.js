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

	// eslint-disable-next-line no-undef
	#input = $state('');
	#PROMPT = '[GREEN][BOLD]&gt;[/BOLD][/GREEN]';
	#lookingForCommandIndex = -1;
	#caretPosition = $state(0);
	// eslint-disable-next-line no-undef
	#terminalValue = $state([]);

	constructor(commands, prompt = this.#PROMPT) {
		this.#PROMPT = prompt;
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
		return this.#input;
	}
	set input(value) {
		this.#input = value;
	}
	get prompt() {
		return this.#PROMPT;
	}
	set prompt(value) {
		this.#PROMPT = value;
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
	 * Handles the this.#input event.
	 *
	 * @param {Event} e - The this.#input event object.
	 */
	handleInput(e) {
		const key = e.key;

		if (key === 'Enter') {
			if (this.#input === '') return;
			this.runCommand(this.#input.trim());
			this.#input = '';
			this.#lookingForCommandIndex = -1;
			this.#caretPosition = 0;
		} else if (key === 'Backspace') {
			if (this.#input.length === 0) return;
			if (e.ctrlKey || e.metaKey) {
				const index = this.#input.lastIndexOf(' ', this.#caretPosition - 1);
				if (index === -1) {
					this.#input = this.#input.slice(this.#caretPosition);
					this.#caretPosition = 0;
				} else {
					this.#input = this.#input.slice(0, index) + this.#input.slice(this.#caretPosition);
					this.#caretPosition = index ;
				}
			} else {
				this.#input = this.#input.slice(0, this.#caretPosition - 1) + this.#input.slice(this.#caretPosition);
				this.#caretPosition = Math.max(0, this.#caretPosition - 1);
			}
		} else if(key === 'Delete') {
			if (this.#input.length === 0) return;
			if (e.ctrlKey || e.metaKey) {
				const index = this.#input.indexOf(' ', this.#caretPosition);
				if (index === -1) {
					this.#input = this.#input.slice(0, this.#caretPosition);
				} else {
					this.#input = this.#input.slice(0, this.#caretPosition) + this.#input.slice(index + 1);
				}
			}else {
				this.#input = this.#input.slice(0, this.#caretPosition) + this.#input.slice(this.#caretPosition + 1);
			}
		}	else if (!e.altKey && !e.ctrlKey && !e.metaKey && key.length === 1) {
			this.#input = this.#input.slice(0, this.#caretPosition) + key + this.#input.slice(this.#caretPosition);
			this.#caretPosition++;
		} else if (key === 'Tab') {
			e.preventDefault();
		} else if (key === 'ArrowUp') {
			e.preventDefault();
			this.#lookingForCommandIndex++;
			this.#input = this.getCommand();
			this.#caretPosition = this.#input.length;
		} else if (key === 'ArrowDown') {
			e.preventDefault();
			if (this.#lookingForCommandIndex === -1) {
				this.#input = '';
				this.#caretPosition = 0;
				return;
			}
			this.#lookingForCommandIndex--;
			this.#input = this.getCommand();
			this.#caretPosition = this.#input.length;
		}else if (key === 'ArrowLeft') {
			this.#caretPosition = Math.max(0, this.#caretPosition - 1);
		}else if (key === 'ArrowRight') {
			this.#caretPosition = Math.min(this.#input.length, this.#caretPosition + 1);
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
				this.#PROMPT +
				'[GREEN] ' +
				val.split(' ')[0] +
				'[/GREEN] ' +
				val.split(' ').slice(1).join(' ')
			);
		} else {
			return (
				'{command}' +
				this.#PROMPT +
				'[RED] ' +
				val.split(' ')[0] +
				'[/RED] ' +
				val.split(' ').slice(1).join(' ')
			);
		}
	}

	/**
	 * Retrieves the command this.#input by the user.
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
		console.log(commands);
		
		return this.#stripLine(
			commands[this.#lookingForCommandIndex] || commands.at(-1) || this.#input
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
		line = line.replace(this.#PROMPT, '');
		const matches = line.match(/\[\/?[A-Z]+\]/g);
		if (matches) {
			return matches.reduce((acc, match) => {
				if (match.startsWith('[/')) {
					return acc.replace(match, '');
				} else {
					return acc.replace(match, '');
				}
			}, line);
		} else {
			return line;
		}
	}

	/**
	 * Pushes a value to the terminal.
	 *
	 * @param {string} value - The value to be pushed to the terminal. Defaults to a single space if not provided.
	 */
	terminalPush(value = ' ') {
		this.terminalValue.push(value || this.#input);
	}

	/**
	 * Resets the terminal to its initial state.
	 * This function clears the terminal screen and resets any state variables
	 * to their default values.
	 */
	resetTerminal() {
		this.#lookingForCommandIndex = -1;
		this.terminalValue = [];
	}

	/**
	 * Executes a given command in the terminal.
	 *
	 * @param {string} command - The command to be executed.
	 */
	runCommand(command) {
		const [cmd, ...args] = command.split(' ');
		this.terminalPush(this.getPrompt(this.#input));
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
		const WRAPPING_TAGS = ['<span class="font-mono whitespace-pre-wrap block">', '</span>'];
		const matches = line.match(/\[\/?[A-Z-]+\]/g);
		if (matches) {
			let openTags = [];
			return WRAPPING_TAGS[0] + matches.reduce((acc, match) => {
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
			}, line) + WRAPPING_TAGS[1];
		} else {
			return WRAPPING_TAGS[0] + line + WRAPPING_TAGS[1];
		}
	}

	isCommand(line) {
		return line.startsWith('{command}');
	}
}
