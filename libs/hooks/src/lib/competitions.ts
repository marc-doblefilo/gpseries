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

export async function getCompetition(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:3333/api/competitions/${id}`
    );

    return [response.data, null];
  } catch (error) {
    console.info(error);

    return [null, error];
  }
}

export async function getCompetitionRanking(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:3333/api/competitions/${id}/ranking`
    );

    return [response.data, null];
  } catch (error) {
    console.info(error);

    return [null, error];
  }
}
