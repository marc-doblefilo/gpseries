import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { InscriptionDTO, RaceDTO } from '@gpseries/contracts';
import { getInscriptionsByRace } from '@gpseries/hooks';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  race: RaceDTO;
  isOpen: boolean;
  inscriptions: InscriptionDTO[] | undefined;
  onClose: () => void;
};

export const AddResultModal: React.FunctionComponent<Props> = ({
  isOpen,
  race,
  inscriptions,
  onClose
}) => {
  const router = useRouter();

  if (!inscriptions || inscriptions.length === 0) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>Add Result</Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <VStack>
              {inscriptions.map(inscription => (
                <Text key={inscription.id}>{inscription.raceId}</Text>
              ))}
            </VStack>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
