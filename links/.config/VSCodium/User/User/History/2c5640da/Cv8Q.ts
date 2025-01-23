import { input, password as passwordInput } from '@inquirer/prompts';
import { logIn } from './auth';

export default async function logIn() {
  const username = await input({ message: 'Username' });
  const password = await passwordInput({ message: 'Password' });

  console.log(`Logging in as ${username}...`);
  console.log(`Password: ${password}`);

  const loggedIn = await logIn(username, password);

  if(!loggedIn) {
    console.error('Failed to log in');
    return;
  }

  console.log('Logged in successfully');
}
