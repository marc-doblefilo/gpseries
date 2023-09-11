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
import { NotificationDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { AppBar } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import axios from 'axios';
import clsx from 'clsx';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React, { useCallback, useEffect } from 'react';

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

  const [notifications, setNotifications] = React.useState<NotificationDTO[]>(
    []
  );

  const getName = () => {
    if (session?.user === null || session?.user === undefined) {
      return undefined;
    }

    if (session?.user.name === null) {
      return undefined;
    }

    return session?.user.name;
  };

  const fetchNotifications = useCallback(() => {
    if (!router.isReady) return;
    try {
      axios
        .get(`http://localhost:3333/api/notifications/by-user`, {
          params: {
            userId: session?.id
          }
        })
        .then(response => {
          setNotifications(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [session, router]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

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
                maxH="40vh"
                overflowY="auto"
              >
                {notifications.map(notification => (
                  <div>
                    <MenuGroup
                      title={notification.competition}
                      _hover={{ bg: 'inherit' }}
                    >
                      <MenuItem _hover={{ bg: 'inherit' }} bg="gray.100">
                        <VStack>
                          <Text>{notification.message}</Text>
                          <Text textColor="gray.800">
                            {notification.timeAgo}
                          </Text>
                        </VStack>
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider color="black" />
                  </div>
                ))}
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
