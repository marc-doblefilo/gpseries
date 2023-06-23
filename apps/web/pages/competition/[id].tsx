import { useToast } from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { CompetitionComponent, Layout } from '@gpseries/ui';
import { Text } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';

export default function Competition() {
  const router = useRouter();
  const toast = useToast();

  const { id, ownerId } = router.query;
  const [session, _loading] = useSession();
  const [competition, setCompetition] = useState<CompetitionDTO>();
  const [user, setUser] = useState<UserDTO>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchCompetition = useCallback(() => {
    setIsFetching(true);
    axios
      .get(`http://localhost:3333/api/competitions/${id}`)
      .then(response => {
        setCompetition(response.data);
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
    axios
      .get(`http://localhost:3333/api/users/${ownerId}`)
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
  }, [id, ownerId, router, toast]);

  useEffect(() => {
    fetchCompetition();
  }, [fetchCompetition]);

  if (!competition || !user) {
    return (
      <Layout session={session}>
        <Text>Competition not found</Text>
      </Layout>
    );
  }

  return (
    <Layout session={session}>
      <CompetitionComponent
        user={user}
        competition={competition}
        fetchCompetition={fetchCompetition}
        isFetching={isFetching}
      />
    </Layout>
  );
}
