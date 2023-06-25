import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Link,
  Spinner,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { CompetitionDTO, UserDTO } from '@gpseries/contracts';
import { useFormatter } from 'next-intl';
import React, { useState } from 'react';

import { RacesComponent } from './competition-races';
import { TeamsComponent } from './competition-teams';

type Props = {
  competition: CompetitionDTO;
  user: UserDTO;
  isFetching: boolean;
};

export const CompetitionComponent: React.FunctionComponent<Props> = ({
  user,
  competition,
  isFetching
}) => {
  const [state, setState] = useState('races');

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
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Container>
  );
};
