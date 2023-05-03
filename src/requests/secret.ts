import axios from './base';
import { ISecret } from "../interfaces";

export async function fetchSecret(secretId?: number): Promise<ISecret> {
  const response = await axios.get<ISecret>('/secret', {
    params: { secretId }
  });
  return response.data;
}
