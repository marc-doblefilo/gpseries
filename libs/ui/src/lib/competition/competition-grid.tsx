import { Grid, GridItem, Spinner, Text } from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
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
    return <Spinner />;
  }

  if (competitions?.length === 0 || !competitions) {
    return <Text>No competitions were found</Text>;
  }

  return (
    <Grid gap={6} templateColumns="repeat(3, 0.5fr)">
      {competitions.map(competition => (
        <GridItem>
          <CompetitionCard competition={competition} />
        </GridItem>
      ))}
    </Grid>
  );
};
