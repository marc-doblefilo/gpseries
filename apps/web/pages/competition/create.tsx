import { Center, Spinner } from '@chakra-ui/react';
import { CompetitionWizard, Layout } from '@gpseries/ui';
import { useSession } from 'next-auth/client';
import React from 'react';

export default function CreateCompetition() {
  const [session, loading] = useSession();

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Layout session={session}>
      <CompetitionWizard />
    </Layout>
  );
}
