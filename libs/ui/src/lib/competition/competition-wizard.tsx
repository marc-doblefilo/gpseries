import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  VStack
} from '@chakra-ui/react';
import { CreateCompetitionDTO } from '@gpseries/contracts';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Session, useSession } from 'next-auth/client';
import React, { useState } from 'react';

export const CompetitionWizard: React.FunctionComponent = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  const currentUserId = session!.id;

  const [name, setName] = useState<string>();
  const [driversPerTeam, setDriversPerTeam] = useState<number>(2);
  const [description, setDescription] = useState('');

  const [nameExistError, setNameExistError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>(
    'Name cannot contains more than 20 characters.'
  );

  const competitionValues: CreateCompetitionDTO = {
    ownerId: currentUserId,
    name: !name ? '' : name.trim(),
    description: description.trim(),
    driversPerTeam: driversPerTeam
  };

  const createCompetition = async (
    competition: CreateCompetitionDTO,
    session: Session
  ) => {
    if (session) {
      try {
        await axios.post(
          `http://localhost:3333/api/competitions`,
          JSON.stringify(competition),
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        router.push('/');
      } catch (error) {
        setNameExistError(true);
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const handleDriversPerTeamChange = (string, value) =>
    setDriversPerTeam(value);

  const handleNameChange = e => {
    if (nameExistError) {
      setNameExistError(false);
      setErrorMessage('Name cannot contains more than 20 characters.');
    }
    setName(e.target.value);
  };

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
  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleCreateCompetition = async () => {
    !loading && (await createCompetition(competitionValues, session!));
  };

  return (
    <Container minWidth="max-content">
      <Card>
        <CardHeader>
          <VStack>
            <Heading>Create Competition</Heading>
          </VStack>
        </CardHeader>
        <Divider />
        <CardBody>
          <Center>
            <Stack direction={'column'}>
              <FormControl
                isInvalid={isNameError() || nameExistError}
                isRequired
              >
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={handleNameChange} />
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input value={description} onChange={handleDescriptionChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Number of drivers per team</FormLabel>
                <NumberInput
                  value={driversPerTeam}
                  min={1}
                  onChange={handleDriversPerTeamChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Stack>
          </Center>
        </CardBody>
        <CardFooter justify="flex-end">
          <Button
            onClick={async () => await handleCreateCompetition()}
            isDisabled={isNameError() || isNameEmpty()}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};
