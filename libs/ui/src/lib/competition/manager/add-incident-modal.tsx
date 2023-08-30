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
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  CreateIncidentDTO,
  DriverDTO,
  InscriptionDTO
} from '@gpseries/contracts';
import { createIncident } from '@gpseries/hooks';
import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React, { useState } from 'react';

type Props = {
  session: Session;
  competition: CompetitionDTO;
  inscriptions: InscriptionDTO[];
  drivers: DriverDTO[];
  raceId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const AddIncidentModal: React.FunctionComponent<Props> = ({
  session,
  isOpen,
  raceId,
  inscriptions,
  drivers,
  competition,
  onClose
}) => {
  const router = useRouter();
  const toast = useToast();

  const [description, setDescription] = useState<string>();
  const [optionsSelected, setOptionsSelected] =
    useState<{ label: string; id: string }[]>();

  const handleDescriptionChange = e => setDescription(e.target.value);

  const areDTOEmpty = () => {
    if (!description || !optionsSelected) {
      return true;
    }

    return false;
  };

  const isDescriptionError = () => {
    if (!description) {
      return false;
    }

    if (description.length > 800) {
      return true;
    }

    return undefined;
  };

  const incidentValues: CreateIncidentDTO = {
    raceId: raceId,
    description: !description ? '' : description.trim(),
    driversId: optionsSelected ? optionsSelected.map(option => option.id) : []
  };

  if (!drivers) {
    return <Spinner />;
  }

  if (!session) {
    router.back();
    return <Text>Race not found</Text>;
  }

  const options: { label: string; id: string }[] = [];

  for (let index = 0; index < drivers.length - 1; index++) {
    options.push({ label: drivers[index].name, id: drivers[index].id });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>Add Incident</Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <VStack>
              <FormControl isInvalid={isDescriptionError()} isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  size="lg"
                  isInvalid={isDescriptionError()}
                  minW="40vw"
                  maxW="40vw"
                />
                <FormErrorMessage>
                  {'Description can not contain more than 800 characters'}
                </FormErrorMessage>
              </FormControl>
              <Autocomplete
                isOptionEqualToValue={(option, value) => option.id === value.id}
                multiple
                disablePortal
                options={options}
                onChange={(event, value) => setOptionsSelected(value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Drivers involved in the incident"
                  />
                )}
                value={optionsSelected}
                style={{ width: '40vw' }}
              />
            </VStack>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isDisabled={isDescriptionError() || areDTOEmpty()}
            colorScheme="green"
            onClick={async () => {
              const [response, error] = await createIncident(incidentValues);

              if (error) {
                toast({
                  title: error.message,
                  status: 'error',
                  duration: 4000,
                  isClosable: true
                });
                return;
              }

              toast({
                title: `${description} has been inscribed`,
                status: 'success',
                duration: 4000,
                colorScheme: 'teal',
                isClosable: true
              });

              router.reload();

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
