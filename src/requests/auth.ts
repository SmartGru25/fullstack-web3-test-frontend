import axios from './base';
import { ICredentials } from '../interfaces';

export async function signIn(credentials: ICredentials): Promise<string> {
  const response = await axios.post<string>('/signin', credentials);
  return response.data;
}

export async function signOut(): Promise<void> {
  await axios.post('/signout');
}