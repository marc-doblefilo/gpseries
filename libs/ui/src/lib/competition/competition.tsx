import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Spinner,
  Table,
  TableContainer,
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
import React from 'react';

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
  const format = useFormatter();

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
          </VStack>
        </CardHeader>
        <Divider />
        <CardBody>
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
        </CardBody>
      </Card>
    </Container>
  );
};
