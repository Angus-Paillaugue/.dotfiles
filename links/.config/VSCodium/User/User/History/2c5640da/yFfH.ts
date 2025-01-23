import { input, password as passwordInput } from '@inquirer/prompts';
import axios from "axios";
import { config } from './config';

export default async function logIn() {
  const username = await input({ message: 'Username' });
  const password = await passwordInput({ message: 'Password' });

  console.log(`Logging in as ${username}...`);
  console.log(`Password: ${password}`);
  const res = await axios.post(config.backendUrl+'/log-in', { username, password });
  if(res.status !== 200) {
    console.error('Failed to log in');
    return;
  }
  console.log(res.data);
}
