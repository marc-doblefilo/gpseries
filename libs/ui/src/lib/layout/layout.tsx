import { useDisclosure } from '@chakra-ui/react';
import { Nullable } from '@gpseries/domain';
import { Container, CssBaseline } from '@material-ui/core';
import { Session, signIn, signOut } from 'next-auth/client';
import React from 'react';

import { CompetitionWizard } from '../competition';
import { LogIn } from '../login/login';
import Navbar from '../navbar/navbar';
import { useStyles } from '../theme';

export interface LayoutProps {
  children;
  session?: Nullable<Session>;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  session,
  children
}) => {
  const classes = useStyles();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logIn = () => signIn();
  const logOut = () => signOut();

  if (!session) {
    return <LogIn logIn={logIn} logOut={logOut} session={session} />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar session={session} onOpenCreateCompetition={onOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
