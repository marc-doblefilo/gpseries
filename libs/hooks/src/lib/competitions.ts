import axios from 'axios';

export async function getCompetitions() {
  const response = await axios.get(`http://localhost:3333/api/competitions`);

  return response.status === 200
    ? [response.data, null]
    : [null, response.data];
}

export async function getUpcomingRace(id: string) {
  const response = await axios.get(
    `http://localhost:3333/api/competitions/${id}/upcoming-race`
  );

  return response.status === 200
    ? [response.data, null]
    : [null, response.data];
}
