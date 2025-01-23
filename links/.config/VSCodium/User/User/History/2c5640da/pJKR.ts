import { input } from '@inquirer/prompts';

export default async function logIn() {
  const username = await input({ message: 'Username' });
  const password = await input({ message: 'Password', type: 'password' });

  console.log(`Logging in as ${username}...`);
}
