import { Center, Heading } from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import { getCompetitions } from '@gpseries/hooks';
import { CompetitionGrid, Layout } from '@gpseries/ui';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';

type PostPageProps = {
  competitions: CompetitionDTO[];
};

export default function Index(props: PostPageProps) {
  const [session, loading] = useSession();

  return (
    <Layout session={session} loading={loading}>
      <Container maxWidth={false}>
        <Box>
          <Center paddingBottom={4}>
            <Heading>Welcome to GPseries!</Heading>
          </Center>
          <CompetitionGrid
            competitions={props.competitions}
            isFetching={false}
          />
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  PostPageProps
> = async () => {
  const [competitions, error] = (await getCompetitions()) ?? null;

  if (error) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      competitions
    }
  };
};
