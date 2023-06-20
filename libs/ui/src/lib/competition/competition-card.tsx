import { CompetitionDTO } from '@gpseries/contracts';
import { Button, Card, Row, Text } from '@nextui-org/react';
import React from 'react';

type Props = {
  competition: CompetitionDTO;
};

export const CompetitionCard: React.FunctionComponent<Props> = ({
  competition
}) => {
  return (
    <Card css={{ bg: 'rgba(0,0,0,0.92)', width: '300px', height: '200px' }}>
      <Card.Body>
        <Text
          h3
          css={{
            textGradient: '45deg, $yellow600 -20%, $red600 100%',
            color: 'white'
          }}
          weight="bold"
        >
          {competition.name}
        </Text>
        <Text css={{ color: 'white' }}>{competition.description}</Text>
      </Card.Body>
      <Card.Footer>
        <Row justify="flex-end">
          <Button
            auto
            css={{
              color: '#000000',
              bg: 'rgb(255,255,255)',
              foreground: '#fff',
              background: 'linear-gradient(to right, #007CF0, #00DFD8)',
              border: '#007CF0'
            }}
          >
            More
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};
