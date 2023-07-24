import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Toast,
  useToast,
  VStack
} from '@chakra-ui/react';
import { CompetitionDTO, CreateRaceDTO } from '@gpseries/contracts';
import { addRace } from '@gpseries/hooks';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React, { useState } from 'react';

type Props = {
  session: Session;
  competition: CompetitionDTO;
  isOpen: boolean;
  onClose: () => void;
};

export const AddRaceModal: React.FunctionComponent<Props> = ({
  session,
  isOpen,
  competition,
  onClose
}) => {
  const router = useRouter();
  const toast = useToast();

  const [name, setName] = useState<string>();
  const [date, setDate] = useState<Date>();

  const handleNameChange = e => setName(e.target.value);
  const handleDateChange = e => setDate(new Date(e.target.value));

  const handleAddRace = async () => {
    const [response, error] = await addRace(competition.id, raceValues);

    if (error) {
      toast({
        title: `Race could not be registered`,
        description: `Please try again later`,
        status: 'error',
        duration: 4000,
        colorScheme: 'red',
        isClosable: true
      });
      return;
    }

    return response;
  };

  const areDTOEmpty = () => {
    if (!name || !date) {
      return true;
    }

    return false;
  };

  const isNameError = () => {
    if (!name) {
      return false;
    }

    if (name.length > 20) {
      return true;
    }

    return false;
  };

  const isDateBeforeToday = () => {
    if (!date) {
      return false;
    }

    if (date < new Date()) {
      return true;
    }

    return false;
  };

  const raceValues: CreateRaceDTO = {
    name: !name ? '' : name.trim(),
    date: !date ? new Date() : date
  };

  if (!session) {
    router.back();
    return <Text>Race not found</Text>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>Add Race</Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <VStack>
              <FormControl isInvalid={isNameError()} isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={handleNameChange} />
                <FormErrorMessage>
                  {'Name can not contain more than 20 characters'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={isDateBeforeToday()}>
                <FormLabel>Date</FormLabel>
                <Input type="datetime-local" onChange={handleDateChange} />
                <FormErrorMessage>
                  {'Date must be a date after today'}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isDisabled={isNameError() || areDTOEmpty() || isDateBeforeToday()}
            colorScheme="green"
            onClick={async () => {
              await handleAddRace();

              toast({
                title: `${name} has been inscribed`,
                status: 'success',
                duration: 4000,
                colorScheme: 'teal',
                isClosable: true
              });

              onClose();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
