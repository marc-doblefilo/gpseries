import {
  Button,
  Container,
  Divider,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { SportsMotorsportsOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React, { Dispatch, SetStateAction } from 'react';

import { CompetitionIncidents } from '../incident/incidents';
import { LeaderboardComponent } from './competition-leaderboard';
import { RacesComponent } from './competition-races';
import { StandingsComponent } from './competition-standings';
import { TeamsComponent } from './competition-teams';

type Props = {
  competition: CompetitionDTO;
  user: UserDTO;
  isFetching: boolean;
  session: Session;
  setCompetition: Dispatch<SetStateAction<CompetitionDTO | undefined>>;
};

export const CompetitionComponent: React.FunctionComponent<Props> = ({
  user,
  competition,
  isFetching,
  setCompetition,
  session
}) => {
  const router = useRouter();

  if (isFetching) {
    return <Spinner />;
  }

  if (!competition) {
    return <Text>Competition not found</Text>;
  }

  return (
    <Container minWidth="80vw">
      <VStack>
        <Heading>{competition.name}</Heading>
        <Heading size="md">{user.name}</Heading>
        {user.id === session!.id && (
          <Button
            colorScheme="teal"
            leftIcon={<SportsMotorsportsOutlined />}
            size="sm"
            onClick={() => router.push(`/competition/${competition.id}/manage`)}
          >
            MANAGE COMPETITION
          </Button>
        )}
      </VStack>
      <Divider paddingTop={3} />
      <Tabs
        variant="soft-rounded"
        isFitted
        colorScheme="orange"
        paddingTop={3}
        isLazy
      >
        <TabList>
          <Tab>STANDINGS</Tab>
          <Tab>LEADERBOARD</Tab>
          <Tab>RACES</Tab>
          <Tab>TEAMS</Tab>
          <Tab>INCIDENTS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StandingsComponent
              competition={competition}
              isFetching={isFetching}
            />
          </TabPanel>
          <TabPanel>
            <LeaderboardComponent
              competition={competition}
              isFetching={isFetching}
            />
          </TabPanel>
          <TabPanel>
            <RacesComponent competition={competition} isFetching={isFetching} />
          </TabPanel>
          <TabPanel>
            <TeamsComponent
              competition={competition}
              isFetching={isFetching}
              session={session}
            />
          </TabPanel>
          <TabPanel>
            <CompetitionIncidents competition={competition} session={session} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
