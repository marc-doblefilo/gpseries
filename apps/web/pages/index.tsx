import { CompetitionDTO } from '@gpseries/contracts';
import { CompetitionGrid, Layout } from '@gpseries/ui';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useSession } from 'next-auth/client';
import React from 'react';

const competition: CompetitionDTO[] = [
  {
    id: 'holahola',
    ownerId: 'holaadios',
    name: 'Formula Uno',
    description: 'Super campeonato de Formula 1',
    races: []
  },
  {
    id: 'holahola',
    ownerId: 'holaadios',
    name: 'Formula Dos',
    description: 'Super campeonato de Formula 1',
    races: []
  }
];

export default function Index() {
  const [session, loading] = useSession();

  return (
    <Layout session={session}>
      <Container maxWidth={false}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to GPSeries!
          </Typography>
          <CompetitionGrid competitions={competition} />
        </Box>
      </Container>
    </Layout>
  );
}
