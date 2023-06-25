import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import { CompetitionDTO, TeamDTO } from '@gpseries/contracts';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  competition: CompetitionDTO;
  isFetching: boolean;
};

export const TeamsComponent: React.FunctionComponent<Props> = ({
  competition,
  isFetching
}) => {
  const router = useRouter();
  const toast = useToast();

  const [teams, setTeams] = useState<TeamDTO[]>();
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);

  const fetchTeams = useCallback(() => {
    setIsFetchingTeams(true);
    if (!router.isReady) return;
    axios
      .get(`http://localhost:3333/api/teams/competition/${competition.id}`)
      .then(response => {
        setTeams(response.data);
        setIsFetchingTeams(false);
      })
      .catch(() => {
        toast({
          title: 'Teams not found for competition',
          description: 'Contact support if this problem continues',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        router.back();
      });
  }, [competition, router, toast]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  if (isFetching || isFetchingTeams) {
    return <Spinner />;
  }

  if (!teams) {
    return <Text>There is no teams in this competition</Text>;
  }

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Teams</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teams.map(team => {
            return (
              <Tr>
                <Td>{team.name}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
