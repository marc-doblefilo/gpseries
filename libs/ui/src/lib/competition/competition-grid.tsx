import { CompetitionDTO } from '@gpseries/contracts';
import { Grid, Loading, Text } from '@nextui-org/react';
import React, { useEffect } from 'react';

import { CompetitionCard } from './competition-card';

type Props = {
  competitions?: CompetitionDTO[];
  fetchCompetitionGrid(): void;
  isFetching: boolean;
};

export const CompetitionGrid: React.FunctionComponent<Props> = ({
  competitions,
  fetchCompetitionGrid,
  isFetching
}) => {
  useEffect(() => {
    fetchCompetitionGrid();
  }, [fetchCompetitionGrid]);

  if (isFetching) {
    return <Loading size="lg" css={{ margin: 'auto' }} />;
  }

  if (competitions?.length === 0 || !competitions) {
    return <Text>No competitions were found</Text>;
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
