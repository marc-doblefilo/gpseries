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
  Tr
} from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import { Delete, Edit, EmojiEvents } from '@material-ui/icons';
import { useFormatter } from 'next-intl';
import React from 'react';

type Props = {
  competition: CompetitionDTO;
  isFetching: boolean;
};

export const RacesManagerComponent: React.FunctionComponent<Props> = ({
  competition,
  isFetching
}) => {
  const format = useFormatter();

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
                  <Button leftIcon={<Delete />} size="sm" colorScheme="red">
                    DELETE
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
