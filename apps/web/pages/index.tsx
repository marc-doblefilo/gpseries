import { CompetitionDTO } from '@gpseries/contracts';
import { CompetitionGrid, Layout } from '@gpseries/ui';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Text } from '@nextui-org/react';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import React, { useCallback, useState } from 'react';

export default function Index() {
  const [session, loading] = useSession();
  const [competitions, setCompetitions] = useState<CompetitionDTO[]>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchCompetitions = useCallback(() => {
    setIsFetching(true);
    axios
      .get(`http://localhost:3333/api/competitions`)
      .then(response => {
        setCompetitions(response.data);
        setIsFetching(false);
      })
      .catch(() => {
        console.error(true);
      });
  }, []);

  return (
    <Layout session={session}>
      <Container maxWidth={false}>
        <Box>
          <Text h1>Welcome to GPSeries!</Text>
          <CompetitionGrid
            competitions={competitions}
            fetchCompetitionGrid={fetchCompetitions}
            isFetching={isFetching}
          />
        </Box>
      </Container>
    </Layout>
  );
}
