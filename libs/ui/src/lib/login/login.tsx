import { Button, Container, Heading } from '@chakra-ui/react';
import { Nullable } from '@gpseries/domain';
import { Session } from 'next-auth/client';
import React from 'react';

type Props = {
  session?: Nullable<Session>;
  logIn(): Promise<void>;
  logOut(): Promise<void>;
};

export const LogIn: React.FunctionComponent<Props> = ({ session, logIn, logOut }) => (
  <Container
    maxWidth={'400px'}
    marginTop={'100px'}
    display={'flex'}
    flexDirection={'column'}
    alignItems={'center'}
    textAlign={'center'}
  >
    <Heading marginTop={'20px'} fontSize={'6xl'}>
      GPSeries
    </Heading>
    {session ? (
      <Button marginTop={'30px'} variant={'solid'} onClick={logOut}>
        Log Out
      </Button>
    ) : (
      <Button marginTop={'30px'} variant={'solid'} onClick={logIn} data-testid={'login'}>
        Log In
      </Button>
    )}
  </Container>
);