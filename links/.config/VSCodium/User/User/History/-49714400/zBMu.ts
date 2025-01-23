import keytar from 'keytar';
import { config } from './config';
import axios from "axios";

export function storeToken(token: string) {
  // Store the token in a secure location
  keytar.setPassword('env-managment', 'token', token);
}

export function getToken() {
  // Retrieve the token from a secure location
  return keytar.getPassword('env-managment', 'token');
}

export async function logIn(username: string, password: string): Promise<boolean> {
  const res = await axios.post(config.backendUrl+'/log-in', { username, password });
  if(res.status !== 200) {
    console.error('Failed to log in');
    return false;
  }

  const token = res.data.token;

  if(!token) {
    console.error('Failed to log in');
    return false;
  }

  storeToken(token);

  return true;
}
