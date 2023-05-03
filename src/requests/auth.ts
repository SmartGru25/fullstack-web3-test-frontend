import { ICredentials, IUser } from '../interfaces';

export async function logIn(credentials: ICredentials): Promise<IUser> {
  throw new Error('Not implemented yet!');
}

export async function logOut(): Promise<void> {
  throw new Error('Not implemented yet!');
}

export async function signUp(credentials: ICredentials): Promise<IUser> {
  throw new Error('Not implemented yet!');
}
