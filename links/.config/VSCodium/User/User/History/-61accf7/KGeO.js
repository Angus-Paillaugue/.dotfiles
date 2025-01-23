import { applyColors } from "./apply-colors.js";
import { chooseTailwindGrayShade } from "./choose-tailwind-gray-shade.js";
import inquirer from 'inquirer';
import chalk from 'chalk';


// applyColors();

// chooseTailwindGrayShade('neutral');


const options = ['gray', 'neutral', 'zinc', 'stone'];

const selectMenu = async () => {
	const { color } = await inquirer.prompt({
		name: 'color',
		type: 'list',
		message: chalk.bold('Choose a tailwind gray shade for the app :'),
		choices: options.map((color) => ({
			name: chalk.bold(color),
			value: color
		}))
	});

	console.log(chalk.green(`Vous avez sélectionné : ${color}`));
};

selectMenu();
