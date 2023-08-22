import {
  Center,
  Container,
  Grid,
  GridItem,
  Image,
  Text
} from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import React from 'react';

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
    <Center>
      <Grid
        gap={6}
        templateColumns={{
          base: 'repeat(1, 0.5fr)',
          lg: 'repeat(2, 0fr)',
          xl: 'repeat(3, 0.5fr)',
          '2xl': 'repeat(4, 0.5fr)'
        }}
      >
        {competitions.map(competition => (
          <GridItem key={competition.id}>
            <CompetitionCard competition={competition} />
          </GridItem>
        ))}
      </Grid>
    </Center>
  );
};
