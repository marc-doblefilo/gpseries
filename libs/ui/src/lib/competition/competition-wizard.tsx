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

export async function createCompetition(
  competition: CreateCompetitionDTO,
  session: Session
) {
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
    } catch (error) {
      console.info(error);
    }
  }
}

export const CompetitionWizard: React.FunctionComponent = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  const currentUserId = session!.id;

  const [name, setName] = useState<string>();
  const [driversPerTeam, setDriversPerTeam] = useState<number>(2);
  const [description, setDescription] = useState('');

  const competitionValues: CreateCompetitionDTO = {
    ownerId: currentUserId,
    name: !name ? '' : name.trim(),
    description: description.trim(),
    driversPerTeam: driversPerTeam
  };

  const handleDriversPerTeamChange = (string, value) =>
    setDriversPerTeam(value);

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
  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleCreateCompetition = async () => {
    !loading && (await createCompetition(competitionValues, session!));

    router.push('/');
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
              <FormControl isInvalid={isNameError()} isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={handleNameChange} />
                <FormErrorMessage>
                  {'Name can not contain more than 20 characters'}
                </FormErrorMessage>
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
