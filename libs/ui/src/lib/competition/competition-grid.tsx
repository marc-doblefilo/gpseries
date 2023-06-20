import { CompetitionDTO } from '@gpseries/contracts';
import { Grid, Text } from '@nextui-org/react';
import React from 'react';

import { CompetitionCard } from './competition-card';

type Props = {
  competitions: CompetitionDTO[];
};

export const CompetitionGrid: React.FunctionComponent<Props> = ({
  competitions
}) => {
  if (competitions.length === 0) {
    <Text>No competitions was found</Text>;
  }

  return (
    <Grid.Container justify="center" gap={2}>
      {competitions.map(competition => (
        <Grid>
          <CompetitionCard competition={competition} />
        </Grid>
      ))}
    </Grid.Container>
  );
};
