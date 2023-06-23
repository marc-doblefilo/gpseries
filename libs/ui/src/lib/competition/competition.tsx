import { Heading, Text } from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { Card, Col, Container, Loading } from '@nextui-org/react';
import React, { useEffect } from 'react';

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
    return <Loading size="lg" css={{ margin: 'auto' }} />;
  }

  if (!competition) {
    return <Text>Competition not found</Text>;
  }

  return (
    <Container>
      <Card css={{ $$cardColor: '' }} variant="bordered">
        <Card.Body>
          <Col>
            <Heading>{competition.name}</Heading>
            <Text>{user.name}</Text>
          </Col>
        </Card.Body>
      </Card>
    </Container>
  );
};
