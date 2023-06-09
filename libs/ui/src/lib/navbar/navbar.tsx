import {
  Avatar,
  Box,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text
} from '@chakra-ui/react';
import { Nullable } from '@gpseries/domain';
import { AppBar, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import NextLink from 'next/link';
import { Session } from 'next-auth/client';
import React from 'react';

import { useStyles } from '../theme';

/* eslint-disable-next-line */
export interface NavbarProps {
  session?: Nullable<Session>;
  onOpenCreateCompetition: () => void;
}

export function Navbar({ session, onOpenCreateCompetition }: NavbarProps) {
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
        <Box p={1} paddingLeft={4}>
          <Link as={NextLink} href="/" style={{ textDecoration: 'none' }}>
            <Image
              boxSize="70px"
              objectFit="inherit"
              src="/gpseries-logo-black.svg"
              alt="GPseries logo"
            />
          </Link>
        </Box>
        <Spacer />
        <Stack direction={'row'} spacing={4}>
          <Box>
            <Link
              _hover={{ textDecoration: 'none', fontWeight: 'bold' }}
              onClick={onOpenCreateCompetition}
              href="/competition/create"
            >
              CREATE COMPETITION
            </Link>
          </Box>
        </Stack>
        <Spacer />
        <Box paddingRight={6}>
          <Flex alignItems="center" gap="3">
            <Text textColor="white">{getUserName()}</Text>
            <Menu>
              <MenuButton as={Button} rounded={'full'} cursor={'pointer'}>
                <Avatar size={'md'} name={getUserName()} />
              </MenuButton>
              <MenuList color="black" textColor="white" backgroundColor="black">
                <MenuDivider />
                <Link
                  href="/api/auth/signout"
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem bg="grey.900" _focus={{ color: 'grey' }}>
                    Logout
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
    </AppBar>
  );
}

export default Navbar;
