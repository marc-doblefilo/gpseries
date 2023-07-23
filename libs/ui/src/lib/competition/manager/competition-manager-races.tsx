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
import { Delete, Edit, EmojiEvents } from '@material-ui/icons';
import { useFormatter } from 'next-intl';
import React from 'react';

import { RaceRemoverAlertDialog } from './competition-manager-race-remover';

type Props = {
  competition: CompetitionDTO;
  isFetching: boolean;
};

export const RacesManagerComponent: React.FunctionComponent<Props> = ({
  competition,
  isFetching
}) => {
  const format = useFormatter();

  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove
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
        </Tbody>
      </Table>
    </TableContainer>
  );
};
