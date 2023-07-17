import { Nullable } from '@gpseries/domain';
import axios from 'axios';

export async function getCompetitions() {
  const response = await axios.get(`http://localhost:3333/api/competitions`);

  return response.status === 200
    ? [response.data, null]
    : [null, response.data];
}
