import axios from './base';
import { ISecret } from "../interfaces";
import { getCookie } from 'typescript-cookie';

export async function fetchSecret(secretId?: number): Promise<ISecret> {
  const token = getCookie('foaltoken') || '';
  const response = await axios.get<ISecret>('/secret', {
    params: { secretId },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}
