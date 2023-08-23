import {
  Button,
  Container,
  Divider,
  Heading,
  HStack,
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
import { ArrowBackIosRounded } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React, { Dispatch, SetStateAction } from 'react';

import { RacesManagerComponent } from './competition-manager-races';

type Props = {
  competition: CompetitionDTO;
  user: UserDTO;
  isFetching: boolean;
  session: Session;
  setCompetition: Dispatch<SetStateAction<CompetitionDTO | undefined>>;
};

export const CompetitionManagerComponent: React.FunctionComponent<Props> = ({
  user,
  competition,
  setCompetition,
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
        <Button
          onClick={() => router.push(`/competition/${competition.id}`)}
          leftIcon={<ArrowBackIosRounded />}
          size="sm"
        >
          Return
        </Button>
      </VStack>
      <Divider mt={5} mb={5} />
      <Tabs variant="soft-rounded" isFitted colorScheme="teal">
        <TabList>
          <Tab>RACES</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RacesManagerComponent
              setCompetition={setCompetition}
              competition={competition}
              isFetching={isFetching}
              session={session}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
