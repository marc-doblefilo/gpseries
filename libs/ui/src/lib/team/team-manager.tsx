import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  CreateDriverDTO,
  CreateTeamDTO,
  RaceDTO,
  TeamDTO
} from '@gpseries/contracts';
import { getUpcomingRace } from '@gpseries/hooks';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Session, useSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';

export async function createDriver(driver: CreateDriverDTO, session: Session) {
  if (session) {
    return await axios.post(
      `http://localhost:3333/api/drivers`,
      JSON.stringify(driver),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  return;
}

type Props = {
  competition: CompetitionDTO;
  team: TeamDTO;
  isOpen: boolean;
  onClose: () => void;
};

type CreateDriversDTO = {
  name: string;
}[];

export const TeamManager: React.FunctionComponent<Props> = ({
  competition,
  isOpen,
  onClose,
  team
}) => {
  const router = useRouter();
  const toast = useToast();

  const [session] = useSession();
  const [upcomingRace, setUpcomingRace] = useState<RaceDTO>();
  const [isFetching, setIsFetching] = useState(false);

  const currentUserId = session!.id;
  const competitionId = competition.id;

  const fetchUpcomingRace = useCallback(() => {
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
      setIsFetching(false);
    });
  }, [router, toast]);

  useEffect(() => {
    fetchUpcomingRace();
  }, [fetchUpcomingRace]);

  if (!upcomingRace || isFetching) {
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
        <ModalHeader>{team.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <VStack>
              <Text size="2xl" as="b">
                Drivers
              </Text>
              <Accordion allowToggle>
                {team.drivers.map(driver => (
                  <AccordionItem>
                    <AccordionButton>
                      <Text>{driver.name}</Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Button>INSCRIBE FOR NEXT RACE</Button>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </VStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
