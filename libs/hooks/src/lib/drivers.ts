import axios, { AxiosError } from 'axios';

export async function getDriver(id: string) {
  try {
    const response = await axios.get(`http://localhost:3333/api/drivers/${id}`);
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err.response];
  }
}
