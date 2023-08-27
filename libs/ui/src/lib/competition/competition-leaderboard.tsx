import {
  Badge,
  Center,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast
} from '@chakra-ui/react';
import { CompetitionDTO, CompetitionRankingDTO } from '@gpseries/contracts';
import { getCompetitionRanking } from '@gpseries/hooks';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  competition: CompetitionDTO;
  isFetching: boolean;
};

export const LeaderboardComponent: React.FunctionComponent<Props> = ({
  competition,
  isFetching
}) => {
  const router = useRouter();
  const toast = useToast();

  const [ranking, setRanking] = useState<CompetitionRankingDTO>();
  const [isFetchingRanking, setIsFetching] = useState(true);

  const fetchRanking = useCallback(() => {
    if (!router.isReady) return;
    getCompetitionRanking(competition.id).then(response => {
      const [data, error] = response;

      if (error) {
        toast({
          title: 'Ranking not found for competition',
          description: 'Contact support if this problem continues',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }

      setRanking(data);

      setIsFetching(false);
    });
  }, [competition, router, toast]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  if (isFetching || isFetchingRanking || !ranking) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <TableContainer overflowX="auto" w="70vw" borderRadius="lg">
      <Table variant="striped">
        <Thead bgColor="teal.500">
          <Tr>
            <Th color="white">Driver</Th>
            {competition.races.map((race, index) => (
              <Tooltip label={race.name} key={race.id}>
                <Th color="white">R{index + 1}</Th>
              </Tooltip>
            ))}
            <Th>
              <Center color="white">Points</Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {ranking.drivers.map(position => {
            return (
              <Tr key={position.driver.id}>
                <Td>
                  <HStack>
                    <Text>{position.driver.name}</Text>
                    <Badge>{position.team.name}</Badge>
                  </HStack>
                </Td>
                {competition.races.map(race => {
                  const inscription = position.inscriptions.find(
                    ins => ins.raceId === race.id
                  );
                  return inscription?.position ? (
                    <Td key={race.id}>
                      {competition.pointsSystem.find(
                        points => points.position === inscription.position
                      )?.points || '-'}
                    </Td>
                  ) : (
                    <Td key={race.id}>-</Td>
                  );
                })}
                <Td>
                  <Center>{position.points}</Center>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
