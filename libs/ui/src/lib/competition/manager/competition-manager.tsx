import {
  Card,
  CardBody,
  CardHeader,
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
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React from 'react';

import { RacesComponent } from '../competition-races';
import { TeamsComponent } from '../competition-teams';
import { RacesManagerComponent } from './competition-manager-races';

type Props = {
  competition: CompetitionDTO;
  user: UserDTO;
  isFetching: boolean;
  session: Session;
};

export const CompetitionManagerComponent: React.FunctionComponent<Props> = ({
  user,
  competition,
  isFetching,
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
    <Container minWidth="max-content">
      <VStack>
        <Heading>{competition.name}</Heading>
        <Heading size="md">Manager</Heading>
      </VStack>
      <Divider mt={5} mb={5} />
      <Tabs variant="soft-rounded" isFitted colorScheme="teal">
        <TabList>
          <Tab>RACES</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RacesManagerComponent
              competition={competition}
              isFetching={isFetching}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
