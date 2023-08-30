import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { Nullable } from '@gpseries/domain';
import { AppBar } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
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
              <Divider orientation="vertical" colorScheme="whiteAlpha" />
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
          <Flex alignItems="center" gap="10">
            <Menu autoSelect={false} isLazy>
              <MenuButton
                as={Button}
                bg="gray.800"
                _hover={{ bg: 'gray.700' }}
                _active={{ bg: 'gray.700' }}
              >
                <Notifications style={{ color: 'white' }} />
              </MenuButton>
              <MenuList
                alignItems={'center'}
                color="gray.100"
                textColor="black"
                backgroundColor="gray.100"
                h="40vh"
                overflowY="scroll"
              >
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Sao Paulo was added</Text>
                      <Text textColor="gray.800">8 hours ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuDivider color="black" />
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Formula One" _hover={{ bg: 'inherit' }}>
                  <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                    <VStack>
                      <Text>The result for the GP Bahrain was added</Text>
                      <Text textColor="gray.800">6 days ago</Text>
                    </VStack>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <Menu autoSelect={false}>
              <MenuButton
                rounded={'full'}
                cursor={'pointer'}
                minW={0}
                bg="inherit"
                _hover={{ bg: 'inherit' }}
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
                <MenuItem
                  bg="grey.900"
                  _focus={{ bg: 'gray.700' }}
                  onClick={() => router.push('/account/settings')}
                >
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
