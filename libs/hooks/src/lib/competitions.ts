import { CreateRaceDTO } from '@gpseries/contracts';
import axios, { AxiosError } from 'axios';

export async function getCompetitions() {
  try {
    const response = await axios.get(`http://localhost:3333/api/competitions`);

    return [response.data, null];
  } catch (error) {
    console.info(error);

    return [null, error];
  }
}

export async function getUpcomingRace(id: string) {
  const response = await axios.get(
    `http://localhost:3333/api/competitions/${id}/upcoming-race`
  );

  return response.status === 200
    ? [response.data, null]
    : [null, response.data];
}

export async function addRace(id: string, dto: CreateRaceDTO) {
  try {
    const response = await axios.post(
      `http://localhost:3333/api/competitions/${id}/race`,
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
