interface Command {
	description: string;
	callback: (...args: string[]) => void;
}

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

	private _input = $state<string>('');
	private _PROMPT: string = '[GREEN][BOLD]&gt;[/BOLD][/GREEN]';
	private _lookingForCommandIndex: number = -1;
	private _caretPosition = $state<number>(0);
	private _terminalValue = $state<string[]>([]);
	private COMMANDS: Record<string, Command>;

	constructor(commands: Record<string, Command>, prompt: string = this._PROMPT) {
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
		return this._terminalValue;
	}
	set terminalValue(value) {
		this._terminalValue = value;
	}
	get commands() {
		return this.COMMANDS;
	}
	set commands(value) {
		this.COMMANDS = value;
	}
	get caretPosition() {
		return this._caretPosition;
	}
	set caretPosition(value) {
		this._caretPosition = value;
	}

	handleInput(e: KeyboardEvent) {
		const key = e.key;

		if (key === 'Enter') {
			if (this._input === '') return;
			this.runCommand(this._input.trim());
			this._input = '';
			this._lookingForCommandIndex = -1;
			this._caretPosition = 0;
		} else if (key === 'Tab') {
			e.preventDefault();
		} else if (key === 'ArrowUp') {
			e.preventDefault();
			this._lookingForCommandIndex++;
			this._input = this.getCommand();
			this._caretPosition = this._input.length;
		} else if (key === 'ArrowDown') {
			e.preventDefault();
			if (this._lookingForCommandIndex === -1) {
				this._input = '';
				this._caretPosition = 0;
				return;
			}
			this._lookingForCommandIndex--;
			this._input = this.getCommand();
			this._caretPosition = this._input.length;
		} else if (key === 'ArrowLeft') {
			this._caretPosition = Math.max(0, this._caretPosition - 1);
		} else if (key === 'ArrowRight') {
			this._caretPosition = Math.min(this._input.length, this._caretPosition + 1);
		}

		this._caretPosition = 
	}

	getPrompt(val: string = ''): string {
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

	getCommand(): string {
		if (this.terminalValue.length === 0) {
			return '';
		}
		const commands = this.terminalValue
			.filter((line) => line.startsWith('{command}'))
			.map((line) => line.replace('{command}', ''))
			.reverse();
		this._lookingForCommandIndex = Math.min(this._lookingForCommandIndex, commands.length - 1);

		return this.stripLine(
			commands[this._lookingForCommandIndex] || commands.at(-1) || this._input
		);
	}

	private stripLine(line: string): string {
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

	terminalPush(value: string = ' '): void {
		this.terminalValue.push(value || this._input);
	}

	resetTerminal(addWelcome: boolean = false): void {
		this._lookingForCommandIndex = -1;
		this.terminalValue = [];
		if (addWelcome) this.addWelcomeMessage();
	}

	runCommand(command: string): void {
		const [cmd, ...args] = command.split(' ');
		this.terminalPush(this.getPrompt(this._input));
		if (!this.COMMANDS[cmd]) {
			this.terminalPush(`Command not found: ${cmd}`);
			return;
		}
		try {
			this.COMMANDS[cmd].callback(...args);
		} catch (_e) {
			if(_e instanceof Error) {
				delete _e.stack;
				this.terminalPush(`[RED]Error running command[/RED]: ${cmd}`);
			}else {
				this.terminalPush(`[RED]Error running command[/RED]: ${cmd}`);
			}
		}
	}

	addWelcomeMessage(): void {
		this.terminalPush(`Welcome to my terminal website!`);
		this.terminalPush(`Type [BG-WHITE]'help'[/BG-WHITE] to see available commands.`);
	}

	parseTerminalLine(line: string): string {
		line = line.replace('{command}', '');
		const WRAPPING_TAGS = ['<span class="font-mono whitespace-pre text-wrap block">', '</span>'];
		const matches = line.match(/\[\/?[A-Z-]+\]/g);
		if (matches) {
			const openTags: (typeof Terminal.DELIMITERS[keyof typeof Terminal.DELIMITERS])[] = [];
			return (
				WRAPPING_TAGS[0] +
				matches.reduce((acc: string, match) => {
					if (match.startsWith('[/')) {
						return acc.replace(match, '</span>');
					} else {
						const color = Terminal.DELIMITERS[match as keyof typeof Terminal.DELIMITERS];
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

	isCommand(line: string): boolean {
		return line.startsWith('{command}');
	}
}
