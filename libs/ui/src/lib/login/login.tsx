import { Button, Container, Heading } from '@chakra-ui/react';
import { Nullable } from '@gpseries/domain';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React from 'react';

type Props = {
  session?: Nullable<Session>;
  logIn(): Promise<void>;
  logOut(): Promise<void>;
};

export const LogIn: React.FunctionComponent<Props> = ({
  session,
  logIn,
  logOut
}) => {
  const router = useRouter();

  return (
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
        <Container>
          <Button
            marginTop={'30px'}
            variant={'solid'}
            onClick={logIn}
            colorScheme="teal"
            data-testid={'login'}
            marginRight="6"
          >
            Log In
          </Button>
          <Button
            marginTop={'30px'}
            variant={'solid'}
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </Container>
      )}
    </Container>
  );
};
