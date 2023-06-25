import {
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
import { useFormatter } from 'next-intl';
import React from 'react';

type Props = {
  competition: CompetitionDTO;
  isFetching: boolean;
};

export const RacesComponent: React.FunctionComponent<Props> = ({
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
      <Table>
        <Thead>
          <Tr>
            <Th>Race</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {competition.races.map(race => {
            return (
              <Tr>
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
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
