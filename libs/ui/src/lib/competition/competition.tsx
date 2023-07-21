import {
  Button,
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
import { SportsMotorsportsOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';
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
  const router = useRouter();

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
            {user.id === session!.id && (
              <Button
                colorScheme="teal"
                leftIcon={<SportsMotorsportsOutlined />}
                size="sm"
                onClick={() =>
                  router.push(`/competition/${competition.id}/manage`)
                }
              >
                MANAGE COMPETITION
              </Button>
            )}
          </VStack>
        </CardHeader>
        <Divider />
        <CardBody>
          <Tabs variant="soft-rounded" isFitted colorScheme="orange">
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
