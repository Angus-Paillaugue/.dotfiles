import { input, password as passwordInput } from '@inquirer/prompts';
import axios from "axios";
import config

export default async function logIn() {
  const username = await input({ message: 'Username' });
  const password = await passwordInput({ message: 'Password' });

  console.log(`Logging in as ${username}...`);
  console.log(`Password: ${password}`);
  const res = await axios.post('http://localhost:3000/login', { username, password });
}
