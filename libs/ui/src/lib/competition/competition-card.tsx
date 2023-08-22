import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Text
} from '@chakra-ui/react';
import { CompetitionDTO } from '@gpseries/contracts';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  competition: CompetitionDTO;
};

export const CompetitionCard: React.FunctionComponent<Props> = ({
  competition
}) => {
  const router = useRouter();

  return (
    <Card w="350px" h="150px" rounded="2xl" bg="gray.900">
      <CardHeader>
        <Heading color="white" size="lg">
          {competition.name}
        </Heading>
      </CardHeader>
      <CardFooter bottom={0} flex={1}>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          _focus={{
            bg: 'gray.200'
          }}
          onClick={() => router.push(`/competition/${competition.id}`)}
        >
          More
        </Button>
      </CardFooter>
    </Card>
  );
};
