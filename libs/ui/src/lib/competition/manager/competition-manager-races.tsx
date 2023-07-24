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
  useDisclosure
} from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import { Add, Delete, Edit, EmojiEvents } from '@material-ui/icons';
import { Session } from 'next-auth/client';
import { useFormatter } from 'next-intl';
import React from 'react';

import { AddRaceModal } from './add-race-modal';
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
                    >
                      ADD RESULT
                    </Button>
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
