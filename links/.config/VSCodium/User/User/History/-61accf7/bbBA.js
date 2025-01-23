import { applyColors } from "./apply-colors.js";
import { chooseTailwindGrayShade } from "./choose-tailwind-gray-shade.js";
import inquirer from 'inquirer';
import chalk from 'chalk';


applyColors();

const askForGrayShade = async () => {
  const availableGrayShades = ['gray', 'neutral', 'zinc', 'stone'];
	const { color } = await inquirer.prompt({
    name: 'color',
		type: 'list',
		message: chalk.bold('Choose a tailwind gray shade for the app :'),
		choices: availableGrayShades.map((color) => ({
      name: chalk.bold(color),
			value: color
		}))
	});
  return color;
};


// (async () => {
//   const grayShade = await askForGrayShade();

//   chooseTailwindGrayShade(grayShade);
// })();
