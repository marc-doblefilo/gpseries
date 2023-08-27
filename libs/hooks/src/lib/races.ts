import { CreateRaceDTO } from '@gpseries/contracts';
import axios, { AxiosError } from 'axios';

export async function createRace(dto: CreateRaceDTO) {
  try {
    const response = await axios.post(
      `http://localhost:3333/api/races`,
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

export async function deleteRace(id: string) {
  try {
    const response = await axios.delete(
      `http://localhost:3333/api/races/${id}`
    );
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
}

export async function getUpcomingRace(competitionId: string) {
  const response = await axios.get(
    `http://localhost:3333/api/races/upcoming-race`,
    {
      params: {
        competitionId
      }
    }
  );

  return response.status === 200
    ? [response.data, null]
    : [null, response.data];
}
