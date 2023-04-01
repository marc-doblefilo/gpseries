import { Nullable } from '@gpseries/domain';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Link from 'next/link';
import { Session , useSession } from 'next-auth/client';
import React from 'react';

import { useStyles } from '../theme';

/* eslint-disable-next-line */
export interface NavbarProps {
  session?: Nullable<Session>;
}

export function Navbar({ session }: NavbarProps) {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar)}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          GPSeries
        </Typography>
        {session && (
          <Link href="/api/auth/signout">
            <Button color="inherit">Logout</Button>
          </Link>
        )}
        {!session && (
          <Link href="/api/auth/signin">
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
