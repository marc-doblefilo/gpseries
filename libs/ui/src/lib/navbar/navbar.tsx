import { Avatar, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Nullable } from '@gpseries/domain';
import {
  AppBar,
  Button,
  Toolbar,
  Typography} from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { Session  } from 'next-auth/client';
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
          <Menu autoSelect={false}>
            <MenuButton as={Button}>
              <Flex alignItems='center' gap='3'>
                <Text textColor='white'>{session.user.name}</Text>
                <Avatar name={session.user.name!} size='md' />
              </Flex>
            </MenuButton>
            <MenuList color='black' textColor='white' backgroundColor='black'>
              <MenuItem _focus={{color: 'grey'}}>
                Profile
              </MenuItem>
              <MenuDivider />
              <Link href="/api/auth/signout">
                <MenuItem _focus={{color: 'grey'}}>
                Logout
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
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
