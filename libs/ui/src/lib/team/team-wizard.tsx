import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast
} from '@chakra-ui/react';
import {
  CompetitionDTO,
  CreateDriverDTO,
  CreateTeamDTO,
  TeamDTO
} from '@gpseries/contracts';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Session, useSession } from 'next-auth/client';
import React, { Dispatch, SetStateAction, useState } from 'react';

export async function createTeam(
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
  isOpen: boolean;
  onClose: () => void;
};

type CreateDriversDTO = {
  name: string;
}[];

export const TeamWizard: React.FunctionComponent<Props> = ({
  competition,
  isOpen,
  onClose
}) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const toast = useToast();

  const currentUserId = session!.id;
  const competitionId = competition.id;

  const [name, setName] = useState<string>();

  const teamValues: CreateTeamDTO = {
    ownerId: currentUserId,
    competitionId,
    name: !name ? '' : name.trim()
  };

  const isAnyDriverNameEmpty = (values: CreateDriversDTO) => {
    const emptyNames = values.filter(value => value.name === '');

    if (emptyNames.length > 0) return true;

    return false;
  };

  const handleNameChange = e => setName(e.target.value);
  const isNameEmpty = () => {
    if (!name) {
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

  const handleCreateTeamAndDrivers = async (drivers: CreateDriversDTO) => {
    if (!loading) {
      const team = await createTeam(teamValues, session!);

      if (!team) {
        return;
      }

      drivers.forEach(driver => {
        createDriver({ name: driver.name, teamId: team.id }, session!).catch(
          error =>
            toast({
              title: 'Error',
              description: error.message,
              status: 'error',
              duration: 5000,
              isClosable: true
            })
        );
      });
    }

    onClose();
    router.reload();
  };

  return (
    <Formik
      initialValues={{ drivers: [{ name: '' }] }}
      onSubmit={(): void => {
        return;
      }}
    >
      {({ values, touched, errors, handleChange, handleBlur }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>CREATE TEAM</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <Stack direction={'column'}>
                  <FormControl isInvalid={isNameError()} isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input value={name} onChange={handleNameChange} />
                    <FormErrorMessage>
                      {'Name can not contain more than 20 characters'}
                    </FormErrorMessage>

                    <Form autoComplete="off">
                      <FieldArray name="drivers">
                        {({ push, remove }) => (
                          <Container>
                            {values.drivers.map((driver, index) => {
                              const driverName = `drivers[${index}.name]`;

                              return (
                                <HStack key={driverName}>
                                  <TextField
                                    margin="normal"
                                    variant="outlined"
                                    label="Driver's name"
                                    required
                                    value={driver.name}
                                    name={driverName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {index !== 0 && (
                                    <Button
                                      margin="normal"
                                      type="button"
                                      colorScheme="red"
                                      variant="outline"
                                      onClick={() => remove(index)}
                                    >
                                      X
                                    </Button>
                                  )}
                                </HStack>
                              );
                            })}
                            {(values.drivers.length <
                              competition.driversPerTeam ||
                              !competition.driversPerTeam) && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  push({ name: '' });
                                }}
                              >
                                ADD
                              </Button>
                            )}
                          </Container>
                        )}
                      </FieldArray>
                    </Form>
                  </FormControl>
                </Stack>
              </Center>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={async () => {
                  await handleCreateTeamAndDrivers(values.drivers);
                }}
                isDisabled={
                  isNameError() ||
                  isNameEmpty() ||
                  isAnyDriverNameEmpty(values.drivers)
                }
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};
