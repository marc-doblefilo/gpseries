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
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  CreateDriverDTO,
  CreateTeamDTO,
  TeamDTO
} from '@gpseries/contracts';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Session, useSession } from 'next-auth/client';
import React, { useState } from 'react';

export async function getNextRace(
  team: CreateTeamDTO,
  session: Session
): Promise<TeamDTO | undefined> {
  if (session) {
    const response = await axios.post(
      `http://localhost:3333/api/teams`,
      JSON.stringify(team),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }

  return;
}

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
  const [session, loading] = useSession();

  const currentUserId = session!.id;
  const competitionId = competition.id;

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
