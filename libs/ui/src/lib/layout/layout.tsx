import { Nullable } from '@gpseries/domain';
import {
  Container,
  CssBaseline,
} from '@material-ui/core';
import { Session, signIn, signOut } from 'next-auth/client';
import React from 'react';

import { LogIn } from '../login/login';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { useStyles } from '../theme';

export interface LayoutProps {
  session?: Nullable<Session>
}

export const Layout: React.FunctionComponent<LayoutProps> = ({session, children}) => {
  const classes = useStyles();

  const logIn = () => signIn();
  const logOut = () => signOut();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        session={session}
      />
      {session ? (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {children}
          </Container>
        </main>
      ) : (
        <LogIn logIn={logIn} logOut={logOut} session={session} />
      )}
    </div>
  );
};

export default Layout;
