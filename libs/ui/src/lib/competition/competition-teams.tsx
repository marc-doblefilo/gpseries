import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  Container,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { CompetitionDTO, TeamDTO } from '@gpseries/contracts';
import { Add } from '@material-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';

import { TeamWizard } from '../team';

type Props = {
  competition: CompetitionDTO;
  isFetching: boolean;
  session: Session;
};

export const TeamsComponent: React.FunctionComponent<Props> = ({
  competition,
  isFetching,
  session
}) => {
  const router = useRouter();
  const toast = useToast();

  const [teams, setTeams] = useState<TeamDTO[]>();
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getIsOwner = useCallback(() => {
    const getId = () => {
      if (session?.id === null || session?.id === undefined) {
        return undefined;
      }

      return session?.id;
    };

    if (teams) {
      const id = getId();
      const teamOwner = teams.filter(team => team.ownerId === id);

      if (teamOwner.length === 1) {
        setIsOwner(true);
      }
    }
  }, [teams, session]);

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

  useEffect(() => {
    getIsOwner();
  }, [getIsOwner]);

  if (isFetching || isFetchingTeams) {
    return <Spinner />;
  }

  if (!teams) {
    return <Text>There is no teams in this competition</Text>;
  }

  return (
    <Container>
      <TeamWizard isOpen={isOpen} onClose={onClose} competition={competition} />
      {isOwner ? undefined : (
        <Center paddingBottom={3}>
          <Button
            colorScheme="teal"
            leftIcon={<Add />}
            size="sm"
            onClick={onOpen}
          >
            CREATE TEAM
          </Button>
        </Center>
      )}
      <Accordion allowToggle>
        {teams.map(team => (
          <AccordionItem>
            <AccordionButton>
              <HStack as="span" flex="1" textAlign="left">
                <Text>{team.name}</Text>
                {team.ownerId === session?.id && (
                  <Badge colorScheme="red">YOUR TEAM</Badge>
                )}
              </HStack>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Drivers</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {team.drivers.map(driver => {
                      return (
                        <Tr>
                          <Td>{driver.name}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
