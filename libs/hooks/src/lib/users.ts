import { CreateUserDTO } from '@gpseries/contracts';
import axios, { AxiosError } from 'axios';

export async function createUser(dto: CreateUserDTO) {
  try {
    const response = await axios.post(
      `http://localhost:3333/api/users`,
      JSON.stringify(dto),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
}
