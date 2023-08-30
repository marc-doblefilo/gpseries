import {
  AbsoluteCenter,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  CompetitionRaceDTO,
  DriverDTO,
  IncidentDTO,
  InscriptionDTO
} from '@gpseries/contracts';
import {
  getDriver,
  getIncidentsByCompetition,
  getInscriptionsByRace
} from '@gpseries/hooks';
import { Session } from 'next-auth/client';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';

import { AddIncidentModal } from './add-incident-modal';

type Props = {
  session: Session;
  competition: CompetitionDTO;
  isFetching: boolean;
  setCompetition: Dispatch<SetStateAction<CompetitionDTO | undefined>>;
};

export const IncidentsManagerComponent: React.FunctionComponent<Props> = ({
  competition,
  setCompetition,
  isFetching,
  session
}) => {
  const toast = useToast();

  const [inscriptions, setInscriptions] = useState<InscriptionDTO[]>([]);
  const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
  const [drivers, setDrivers] = useState<DriverDTO[]>([]);
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [isFetchingIncidents, setFetchingIncidents] = useState<boolean>(true);

  const fetchIncidents = useCallback(async () => {
    setFetchingIncidents(true);
    const [response, error] = await getIncidentsByCompetition(competition.id);

    setIncidents(response);
    setFetchingIncidents(false);
  }, [competition]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const fetchInscriptions = async (raceId: string) => {
    const [response, error] = await getInscriptionsByRace(raceId);

    if (error) {
      toast({
        title: `Cannot get the inscriptions for this race`,
        description: `Please try again later`,
        status: 'error',
        duration: 4000,
        colorScheme: 'red',
        isClosable: true
      });
      return;
    }

    const drivers: DriverDTO[] = await Promise.all(
      response.map(async inscription => {
        const response = await getDriver(inscription.driverId);

        const [driver] = response;

        return driver;
      })
    );

    setInscriptions(response);
    setDrivers(drivers);
  };

  const handleFetchInscription = async (race: CompetitionRaceDTO) => {
    await fetchInscriptions(race.id);
  };

  const handleOpenAddIncident = async (race: CompetitionRaceDTO) => {
    setSelectedRace(race.id);
    onOpenAdd();
  };

  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd
  } = useDisclosure();

  if (isFetching || isFetchingIncidents) {
    return <Spinner />;
  }

  if (!competition) {
    return <Text>Competition not found</Text>;
  }

  return (
    <Center>
      <Accordion minW="70vw" maxW="70vw">
        {competition.races.map(race => {
          const raceIncidents = incidents.filter(
            incident => incident.raceId === race.id
          );

          return (
            <AccordionItem
              key={race.id}
              onClick={() => handleFetchInscription(race)}
            >
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {race.name}
                </Box>
                <AccordionIcon alignContent="right" />
              </AccordionButton>
              <AccordionPanel>
                <Grid
                  templateColumns={{
                    base: 'repeat(1, 0.5fr)'
                  }}
                  gap={2}
                  alignItems="stretch"
                >
                  {raceIncidents.map(incident => (
                    <GridItem display="flex">
                      <Card
                        maxW={{ base: '65vw' }}
                        minW={{ base: '65vw' }}
                        display="flex"
                        justifyContent="space-between"
                        flexFlow="column"
                        flexGrow={1}
                      >
                        <CardBody>
                          <Stack divider={<StackDivider />} spacing="4">
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Incident's description
                              </Heading>
                              <Text pt="2" fontSize="sm">
                                {incident.description}
                              </Text>
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Driver's involved
                              </Heading>
                              <Text pt="2" fontSize="sm">
                                {incident.driversId.map((driverId, index) => {
                                  const driver = drivers.find(
                                    driver => driver.id === driverId
                                  );

                                  console.info(drivers);
                                  console.info(driverId);

                                  return (
                                    <React.Fragment key={driverId}>
                                      {driver
                                        ? driver.name
                                        : 'Driver not found'}
                                      {index < incident.driversId.length - 1
                                        ? ', '
                                        : '.'}
                                    </React.Fragment>
                                  );
                                })}
                              </Text>
                            </Box>
                            <Box>
                              <Button colorScheme="red" size="sm">
                                REMOVE
                              </Button>
                            </Box>
                          </Stack>
                        </CardBody>
                      </Card>
                    </GridItem>
                  ))}
                  <GridItem>
                    <Card minW={{ lg: '20vw', base: '65vw' }} minH="20vh">
                      <CardBody>
                        <AbsoluteCenter>
                          <Button
                            colorScheme="teal"
                            onClick={() => handleOpenAddIncident(race)}
                          >
                            ADD
                          </Button>
                        </AbsoluteCenter>
                      </CardBody>
                    </Card>
                  </GridItem>
                </Grid>
                <AddIncidentModal
                  session={session}
                  competition={competition}
                  inscriptions={inscriptions}
                  drivers={drivers}
                  raceId={selectedRace}
                  isOpen={isOpenAdd}
                  onClose={onCloseAdd}
                />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Center>
  );
};
