import {
  Card,
  CardHeader,
  Container,
  Heading,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import React from 'react';

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
  if (isFetching) {
    return <Spinner />;
  }

  if (!competition) {
    return <Text>Competition not found</Text>;
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <VStack>
            <Heading>{competition.name}</Heading>
            <Text>{user.name}</Text>
          </VStack>
        </CardHeader>
      </Card>
    </Container>
  );
};
