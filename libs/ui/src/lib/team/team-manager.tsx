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
  Tooltip,
  useToast,
  VStack
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  InscriptionDTO,
  RaceDTO,
  TeamDTO
} from '@gpseries/contracts';
import { getInscription, getUpcomingRace } from '@gpseries/hooks';
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
  const [inscriptions, setInscriptions] = useState<InscriptionDTO[]>([]);
  const [isFetching, setIsFetching] = useState(false);

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
      team.drivers.forEach(driver => {
        getInscription(driver.id, data.id).then(response => {
          const [data] = response;

          if (data) {
            setInscriptions([...inscriptions, data]);
          }
        });
      });

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
                    <AccordionButton gap={2}>
                      <Text>{driver.name}</Text>
                      {!inscriptions.some(
                        inscription => inscription.driverId === driver.id
                      ) && (
                        <Tooltip label="This driver is not inscribed for next race">
                          <Warning style={{ color: 'orange' }} />
                        </Tooltip>
                      )}
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Button>INSCRIBE</Button>
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
