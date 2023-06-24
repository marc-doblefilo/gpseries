import { useToast } from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { CompetitionComponent, Layout } from '@gpseries/ui';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';

export default function Competition() {
  const router = useRouter();
  const toast = useToast();

  const [session] = useSession();
  const [competition, setCompetition] = useState<CompetitionDTO>();
  const [user, setUser] = useState<UserDTO>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchCompetition = useCallback(() => {
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
              title: 'Competition not found',
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
    fetchCompetition();
  }, [fetchCompetition]);

  if (!competition || !user) {
    return <Loading />;
  }

  return (
    <Layout session={session}>
      <CompetitionComponent
        user={user}
        competition={competition}
        isFetching={isFetching}
      />
    </Layout>
  );
}
