import { Center, Spinner, Text, useToast } from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import {
  CompetitionComponent,
  CompetitionManagerComponent,
  Layout
} from '@gpseries/ui';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';

export default function CompetitionManager() {
  const router = useRouter();
  const toast = useToast();

  const [session, loading] = useSession();
  const [competition, setCompetition] = useState<CompetitionDTO>();
  const [user, setUser] = useState<UserDTO>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchCompetitionAndOwner = useCallback(() => {
    setIsFetching(true);
    if (!router.isReady) return;
    axios
      .get(`http://localhost:3333/api/competitions/${router.query.id}`)
      .then(response => {
        setCompetition(response.data);
        axios
          .get(`http://localhost:3333/api/users/${response.data.ownerId}`)
          .then(response => {
            setUser(response.data);
            setIsFetching(false);
          })
          .catch(() => {
            toast({
              title: 'Owner not found',
              description: 'Contact support if this problem continues',
              status: 'error',
              duration: 5000,
              isClosable: true
            });
            router.back();
          });
        setIsFetching(false);
      })
      .catch(() => {
        toast({
          title: 'Competition not found',
          description: 'Contact support if this problem continues',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        router.back();
      });
  }, [router, toast]);

  useEffect(() => {
    fetchCompetitionAndOwner();
  }, [fetchCompetitionAndOwner]);

  if (isFetching || loading || !user || !competition) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (user?.id !== session?.id) {
    router.back();
    return;
  }

  return (
    <Layout session={session}>
      <CompetitionManagerComponent
        competition={competition}
        user={user}
        isFetching={isFetching}
        session={session}
      />
    </Layout>
  );
}
