import { Container, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import React, { useEffect } from 'react';

import { CompetitionCard } from './competition-card';

type Props = {
  competitions?: CompetitionDTO[];
  isFetching: boolean;
};

export const CompetitionGrid: React.FunctionComponent<Props> = ({
  competitions,
  isFetching
}) => {
  if (isFetching || !competitions) {
    return (
      <Container
        maxWidth={'400px'}
        marginTop={'100px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        textAlign={'center'}
      >
        <Image
          boxSize="150px"
          objectFit="inherit"
          src="/gpseries-logo-white.svg"
          alt="GPseries logo"
        />
      </Container>
    );
  } else if (competitions?.length === 0) {
    return <Text>No competitions were found</Text>;
  }

  return (
    <Grid gap={6} templateColumns="repeat(3, 0.5fr)">
      {competitions.map(competition => (
        <GridItem key={competition.id}>
          <CompetitionCard competition={competition} />
        </GridItem>
      ))}
    </Grid>
  );
};
