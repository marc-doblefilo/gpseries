import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
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
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React from 'react';

import { useStyles } from '../theme';
import { NavLink } from './navlink';

/* eslint-disable-next-line */
export interface NavbarProps {
  session?: Nullable<Session>;
  onOpenCreateCompetition: () => void;
}

export function Navbar({ session, onOpenCreateCompetition }: NavbarProps) {
  const classes = useStyles();
  const router = useRouter();

  const getName = () => {
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
        <Stack direction={'row'} spacing={4}>
          <Box>
            <HStack spacing={8} alignItems={'center'}>
              <Box
                p="1"
                pl={{
                  base: '2',
                  lg: '6'
                }}
              >
                <Link as={NextLink} href="/" style={{ textDecoration: 'none' }}>
                  <Image
                    boxSize="70px"
                    objectFit="inherit"
                    src="/gpseries-logo-black.svg"
                    alt="GPseries logo"
                  />
                </Link>
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                <NavLink
                  key="create-competition"
                  onClick={() => router.push('/competition/create')}
                >
                  CREATE COMPETITION
                </NavLink>
              </HStack>
            </HStack>
          </Box>
        </Stack>
        <Spacer />
        <Box paddingRight={6}>
          <Flex alignItems="center" gap="1">
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'md'} name={getName()} />
              </MenuButton>
              <MenuList
                alignItems={'center'}
                color="gray.900"
                textColor="white"
                backgroundColor="gray.900"
              >
                <br />
                <Center>
                  <p>{getName()}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem bg="grey.900" _focus={{ bg: 'gray.700' }}>
                  Account Settings
                </MenuItem>
                <MenuItem
                  bg="gray.900"
                  _focus={{ bg: 'gray.700' }}
                  onClick={() => router.push('/api/auth/signout')}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
    </AppBar>
  );
}

export default Navbar;
