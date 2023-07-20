import {
  Button,
  Center,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Tooltip,
  Tr,
  useToast,
  VStack
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  CreateInscriptionDTO,
  InscriptionDTO,
  RaceDTO,
  TeamDTO
} from '@gpseries/contracts';
import {
  createInscription,
  getInscription,
  getUpcomingRace
} from '@gpseries/hooks';
import Warning from '@material-ui/icons/Warning';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  competition: CompetitionDTO;
  team: TeamDTO;
  isOpen: boolean;
  onClose: () => void;
};

export const TeamManager: React.FunctionComponent<Props> = ({
  competition,
  isOpen,
  onClose,
  team
}) => {
  const router = useRouter();
  const toast = useToast();

  const [, loading] = useSession();
  const [upcomingRace, setUpcomingRace] = useState<RaceDTO>();
  const [inscriptions, setInscriptions] = useState<InscriptionDTO[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleCreateInscription = async (dto: CreateInscriptionDTO) => {
    if (!loading) {
      const [data, error] = await createInscription(dto);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        return;
      }

      return data;
    }
  };

  const fetchUpcomingRaceAndInscriptions = useCallback(() => {
    setIsFetching(true);
    if (!router.isReady) return;
    getUpcomingRace(router.query.id as string).then(response => {
      const [data, error] = response;

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        router.back();
      }

      setUpcomingRace(data);

      if (!team) {
        return;
      }

      team.drivers.forEach(driver => {
        getInscription(driver.id, data.id).then(response => {
          const [data] = response;

          if (data) {
            const inscription = data as InscriptionDTO;
            inscriptions.push(inscription);
          }
        });
      });

      setIsFetching(false);
    });
  }, [router, toast, inscriptions, team]);

  useEffect(() => {
    fetchUpcomingRaceAndInscriptions();
  }, [fetchUpcomingRaceAndInscriptions]);

  if (!team) {
    return <Container></Container>;
  }

  if (isFetching) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>{team.name}</Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <VStack>
              <Text size="2xl" as="b">
                Drivers
              </Text>
              <TableContainer>
                <Table>
                  <Tbody>
                    {team.drivers.map(driver => (
                      <Tr>
                        <Th>{driver.name}</Th>
                        {upcomingRace &&
                          !inscriptions.some(
                            inscription => inscription.driverId === driver.id
                          ) && (
                            <Th>
                              <Tooltip label="This driver is not inscribed for next race">
                                <Warning style={{ color: 'orange' }} />
                              </Tooltip>
                            </Th>
                          )}
                        {upcomingRace &&
                          !inscriptions.some(
                            inscription => inscription.driverId === driver.id
                          ) && (
                            <Th>
                              <Button
                                size="sm"
                                onClick={async () => {
                                  const inscription =
                                    await handleCreateInscription({
                                      driverId: driver.id,
                                      raceId: upcomingRace.id
                                    });

                                  toast({
                                    title: `${driver.name} has been inscribed`,
                                    description: `${driver.name} is succesfully inscribed for ${upcomingRace.name} race!`,
                                    status: 'success',
                                    duration: 4000,
                                    colorScheme: 'teal',
                                    isClosable: true
                                  });

                                  setInscriptions([
                                    ...inscriptions,
                                    inscription
                                  ]);
                                }}
                              >
                                INSCRIBE
                              </Button>
                            </Th>
                          )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
