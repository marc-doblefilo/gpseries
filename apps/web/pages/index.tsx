import { Center, Heading } from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import { CompetitionGrid, Layout } from '@gpseries/ui';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

export default function Index() {
  const [session, loading] = useSession();
  const [competitions, setCompetitions] = useState<CompetitionDTO[]>();
  const [isFetching, setIsFetching] = useState(false);

  const t = useTranslations('Home');

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

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  return (
    <Layout session={session}>
      <Container maxWidth={false}>
        <Box>
          <Center>
            <Heading>{t('welcome')}</Heading>
          </Center>
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

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`)
    }
  };
}
