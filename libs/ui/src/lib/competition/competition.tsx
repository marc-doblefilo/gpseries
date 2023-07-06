import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { Session } from 'next-auth/client';
import React from 'react';

import { RacesComponent } from './competition-races';
import { TeamsComponent } from './competition-teams';

type Props = {
  competition: CompetitionDTO;
  user: UserDTO;
  isFetching: boolean;
  session: Session;
};

export const CompetitionComponent: React.FunctionComponent<Props> = ({
  user,
  competition,
  isFetching,
  session
}) => {
  if (isFetching) {
    return <Spinner />;
  }

  if (!competition) {
    return <Text>Competition not found</Text>;
  }

  return (
    <Container minWidth="max-content">
      <Card>
        <CardHeader>
          <VStack>
            <Heading>{competition.name}</Heading>
            <Text>{user.name}</Text>
            <Stack direction="row" gap={4} paddingTop={5}></Stack>
          </VStack>
        </CardHeader>
        <Divider />
        <CardBody>
          <Tabs variant="soft-rounded" isFitted>
            <TabList>
              <Tab>RACES</Tab>
              <Tab>TEAMS</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RacesComponent
                  competition={competition}
                  isFetching={isFetching}
                />
              </TabPanel>
              <TabPanel>
                <TeamsComponent
                  competition={competition}
                  isFetching={isFetching}
                  session={session}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Container>
  );
};
