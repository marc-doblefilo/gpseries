import { Heading } from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import { Button, Card, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  competition: CompetitionDTO;
};

export const CompetitionCard: React.FunctionComponent<Props> = ({
  competition
}) => {
  const router = useRouter();

  return (
    <Card css={{ bg: 'rgba(0,0,0,0.92)', width: '300px', height: '200px' }}>
      <Card.Body>
        <Heading color="white">{competition.name}</Heading>
        <Text css={{ color: 'white' }}>{competition.description}</Text>
      </Card.Body>
      <Card.Footer>
        <Row justify="flex-end">
          <Button
            auto
            color="gradient"
            ghost
            onPress={() =>
              router.push(`/competition/${encodeURIComponent(competition.id)}`)
            }
          >
            More
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};
