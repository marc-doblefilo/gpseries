import { CreateIncidentDTO } from '@gpseries/contracts';
import axios, { AxiosError } from 'axios';

export async function createIncident(dto: CreateIncidentDTO) {
  try {
    const response = await axios.post(
      `http://localhost:3333/api/incidents`,
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

export async function getIncidentsByCompetition(competitionId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3333/api/incidents/by-competition`,
      {
        params: {
          competitionId
        }
      }
    );
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err.response];
  }
}
