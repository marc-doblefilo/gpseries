import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { Card, Col, Container, Loading, Text } from '@nextui-org/react';
import React, { useEffect } from 'react';

type Props = {
  competition: CompetitionDTO;
  user: UserDTO;
  fetchCompetition(): void;
  isFetching: boolean;
};

export const CompetitionComponent: React.FunctionComponent<Props> = ({
  user,
  competition,
  fetchCompetition,
  isFetching
}) => {
  useEffect(() => {
    fetchCompetition();
  }, [fetchCompetition]);

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
            <Text h2>{competition.name}</Text>
            <Text h5>{user.name}</Text>
          </Col>
        </Card.Body>
      </Card>
    </Container>
  );
};
