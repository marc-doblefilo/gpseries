import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text
} from '@chakra-ui/react';
import { Nullable } from '@gpseries/domain';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { Session } from 'next-auth/client';
import React from 'react';

import { useStyles } from '../theme';

/* eslint-disable-next-line */
export interface NavbarProps {
  session?: Nullable<Session>;
}

export function Navbar({ session }: NavbarProps) {
  const classes = useStyles();

  const getUserName = () => {
    if (session?.user === null || session?.user === undefined) {
      return undefined;
    }

    if (session?.user.name === null) {
      return undefined;
    }

    return session?.user.name;
  };

  return (
    <AppBar position="absolute" className={clsx(classes.appBar)}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p={4}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            GPseries
          </Typography>
        </Box>
        <Spacer />
        <Box paddingRight={6}>
          <Flex alignItems="center" gap="3">
            <Text textColor="white">{getUserName()}</Text>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'md'} name={getUserName()} />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
    </AppBar>
  );
}

export default Navbar;
