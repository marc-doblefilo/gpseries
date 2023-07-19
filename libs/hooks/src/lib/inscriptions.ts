import { CreateInscriptionDTO } from '@gpseries/contracts';
import axios, { AxiosError } from 'axios';

export async function getInscription(driverId: string, raceId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3333/api/inscriptions/`,
      {
        params: {
          driverId: driverId,
          raceId: raceId
        }
      }
    );
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err.response];
  }
}

export async function createInscription(dto: CreateInscriptionDTO) {
  try {
    const response = await axios.post(
      `http://localhost:3333/api/inscriptions`,
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
