import {
  Center,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  DriverDTO,
  InscriptionDTO,
  TeamDTO
} from '@gpseries/contracts';
import {
  getDriversByTeam,
  getInscriptionsByRace,
  getTeamsByCompetition
} from '@gpseries/hooks';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  competition: CompetitionDTO;
  isFetching: boolean;
};

export const RankingComponent: React.FunctionComponent<Props> = ({
  competition,
  isFetching
}) => {
  const router = useRouter();
  const toast = useToast();

  const [teams, setTeams] = useState<TeamDTO[]>();
  const [isFetchingDrivers, setIsFetchingDrivers] = useState(true);
  const [drivers, setDrivers] = useState<DriverDTO[]>([]);
  const [inscriptions, setInscriptions] = useState<InscriptionDTO[]>([]);

  const fetchDrivers = useCallback(() => {
    if (!router.isReady) return;
    getTeamsByCompetition(competition.id).then(teams => {
      const [data, error] = teams;

      if (error) {
        toast({
          title: 'Teams not found for competition',
          description: 'Contact support if this problem continues',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }

      setTeams(data);

      const promises = data.map(team => getDriversByTeam(team.id));

      Promise.all(promises).then(driversResponses => {
        driversResponses.forEach(([driversData, error]) => {
          if (error) {
            toast({
              title: 'Drivers not found for competition',
              description: 'Contact support if this problem continues',
              status: 'error',
              duration: 5000,
              isClosable: true
            });
          } else {
            setDrivers(prevDrivers => [...prevDrivers, ...driversData]);
          }
        });
      });

      setIsFetchingDrivers(false);
    });
  }, [competition, router, toast]);

  const fetchInscriptions = useCallback(() => {
    if (!router.isReady) return;
    const promises = competition.races.map(race =>
      getInscriptionsByRace(race.id)
    );

    Promise.all(promises).then(responses => {
      responses.forEach(([inscriptions]) => {
        setInscriptions(prevInscriptions => [
          ...prevInscriptions,
          ...inscriptions
        ]);
      });
    });
  }, [competition, router]);

  useEffect(() => {
    fetchDrivers();
    fetchInscriptions();
  }, [fetchDrivers, fetchInscriptions]);

  if (isFetching || isFetchingDrivers) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <TableContainer overflowX="auto" w="70vw">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Driver</Th>
            {competition.races.map((race, index) => (
              <Tooltip label={race.name} key={race.id}>
                <Th>{index + 1}</Th>
              </Tooltip>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {drivers.map(driver => {
            const driverInscriptions = inscriptions.filter(
              inscription => inscription.driverId === driver.id
            );

            return (
              <Tr key={driver.id}>
                <Td>{driver.name}</Td>
                {competition.races.map(race => {
                  const inscription = driverInscriptions.find(
                    ins => ins.raceId === race.id
                  );
                  return inscription?.position ? (
                    <Td key={race.id}>{inscription.position}</Td>
                  ) : (
                    <Td key={race.id}>-</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
