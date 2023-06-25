import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Link,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { useFormatter } from 'next-intl';
import React, { useState } from 'react';

import { RacesComponent } from './competition-races';
import { TeamsComponent } from './competition-teams';

type Props = {
  competition: CompetitionDTO;
  user: UserDTO;
  isFetching: boolean;
};

export const CompetitionComponent: React.FunctionComponent<Props> = ({
  user,
  competition,
  isFetching
}) => {
  const [state, setState] = useState('races');

  if (isFetching) {
    return <Spinner />;
  }

  if (!competition) {
    return <Text>Competition not found</Text>;
  }

  return (
    <Container minWidth="max-content">
      <Card>
        <CardHeader>
          <VStack>
            <Heading>{competition.name}</Heading>
            <Text>{user.name}</Text>
            <Stack direction="row" gap={4} paddingTop={5}>
              <Link
                fontSize={'sm'}
                fontWeight={500}
                _hover={{
                  textDecoration: 'none'
                }}
                onClick={() => setState('races')}
              >
                Races
              </Link>
              <Link
                fontSize={'sm'}
                fontWeight={500}
                _hover={{
                  textDecoration: 'none'
                }}
                onClick={() => setState('teams')}
              >
                Teams
              </Link>
            </Stack>
          </VStack>
        </CardHeader>
        <Divider />
        <CardBody>
          {state === 'races' && (
            <RacesComponent competition={competition} isFetching={isFetching} />
          )}
          {state === 'teams' && (
            <TeamsComponent competition={competition} isFetching={isFetching} />
          )}
        </CardBody>
      </Card>
    </Container>
  );
};
