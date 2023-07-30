import {
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { CompetitionDTO, InscriptionDTO, RaceDTO } from '@gpseries/contracts';
import { getInscriptionsByRace } from '@gpseries/hooks';
import { Add, Delete, Edit, EmojiEvents } from '@material-ui/icons';
import { Session } from 'next-auth/client';
import { useFormatter } from 'next-intl';
import React, { useState } from 'react';

import { AddRaceModal } from './add-race-modal';
import { AddResultModal } from './add-result-modal';
import { RaceRemoverAlertDialog } from './race-remover-alert-dialog';

type Props = {
  session: Session;
  competition: CompetitionDTO;
  isFetching: boolean;
};

export const RacesManagerComponent: React.FunctionComponent<Props> = ({
  competition,
  isFetching,
  session
}) => {
  const format = useFormatter();
  const toast = useToast();

  const [inscriptions, setInscriptions] = useState<InscriptionDTO[]>();

  const fetchInscriptions = async (raceId: string) => {
    const [response, error] = await getInscriptionsByRace(raceId);

    if (error) {
      toast({
        title: `Cannot get the inscriptions for this race`,
        description: `Please try again later`,
        status: 'error',
        duration: 4000,
        colorScheme: 'red',
        isClosable: true
      });
      return;
    }

    setInscriptions(response);
  };

  const handleOpenAddResult = async (race: RaceDTO) => {
    await fetchInscriptions(race.id);
    onOpenAddResult();
  };

  const {
    isOpen: isOpenAddResult,
    onOpen: onOpenAddResult,
    onClose: onCloseAddResult
  } = useDisclosure();
  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd
  } = useDisclosure();

  if (isFetching) {
    return <Spinner />;
  }

  if (!competition) {
    return <Text>Competition not found</Text>;
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Race</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {competition.races.map(race => {
            return (
              <Tr key={race.id}>
                <RaceRemoverAlertDialog
                  race={race}
                  isOpen={isOpenRemove}
                  onClose={onCloseRemove}
                />
                <Td>{race.name}</Td>
                <Td>
                  {format.dateTime(new Date(race.date), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </Td>
                {new Date(race.date) < new Date() ? (
                  <Td>
                    <Button
                      leftIcon={<EmojiEvents />}
                      size="sm"
                      colorScheme="green"
                      onClick={async () => {
                        await handleOpenAddResult(race);
                      }}
                    >
                      ADD RESULT
                    </Button>
                    <AddResultModal
                      race={race}
                      isOpen={isOpenAddResult}
                      onClose={onCloseAddResult}
                      inscriptions={inscriptions}
                    />
                  </Td>
                ) : (
                  <Td></Td>
                )}
                <Td>
                  <Button leftIcon={<Edit />} size="sm">
                    MODIFY
                  </Button>
                </Td>
                <Td>
                  <Button
                    leftIcon={<Delete />}
                    size="sm"
                    colorScheme="red"
                    onClick={onOpenRemove}
                  >
                    REMOVE
                  </Button>
                </Td>
              </Tr>
            );
          })}
          <Tr>
            <Td>
              <AddRaceModal
                isOpen={isOpenAdd}
                onClose={onCloseAdd}
                session={session}
                competition={competition}
              />
              <Button
                colorScheme="green"
                size="sm"
                leftIcon={<Add />}
                onClick={onOpenAdd}
              >
                ADD
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
