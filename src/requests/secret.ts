import axios from './base';
import { ISecret } from "../interfaces";
import { getToken } from '../token';

export async function fetchSecret(secretId?: number): Promise<ISecret> {
  const token = getToken();
  const response = await axios.get<ISecret>('/secret', {
    params: { secretId },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}
