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
  }
}

export const CompetitionWizard: React.FunctionComponent = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  const currentUserId = session!.id;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const competitionValues: CreateCompetitionDTO = {
    ownerId: currentUserId,
    name,
    description
  };

  const handleNameChange = e => setName(e.target.value);
  const isNameError = name === '' || name.length > 20;
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
              <FormControl isInvalid={isNameError}>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={handleNameChange} />
                <FormErrorMessage>
                  {name === ''
                    ? 'Name is required'
                    : 'Name must contain equal or less than 20 characters'}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input value={description} onChange={handleDescriptionChange} />
              </FormControl>
            </Stack>
          </Center>
        </CardBody>
        <CardFooter justify="flex-end">
          <Button
            onClick={async () => await handleCreateCompetition()}
            isDisabled={isNameError}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};
