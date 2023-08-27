import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { CreateUserDTO } from '@gpseries/contracts';
import { createUser } from '@gpseries/hooks';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const RegisterForm: React.FunctionComponent = () => {
  const toast = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState<string>();
  const handleNameChange = e => setName(e.target.value);
  const isNameEmpty = name === '';

  const [username, setUsername] = useState<string>();
  const handleUsernameChange = e => setUsername(e.target.value);
  const isUsernameEmpty = username === '';

  const [password, setPassword] = useState<string>();
  const handlePasswordChange = e => setPassword(e.target.value);
  const isPasswordEmpty = password === '';

  const userValues: CreateUserDTO = {
    name: !name ? '' : name.trim(),
    username: !username ? '' : username.trim(),
    plainPassword: !password ? '' : password.trim()
  };

  const handleCreateUser = async () => {
    const [response, error] = await createUser(userValues);

    if (error) {
      toast({
        title: `Race could not be registered`,
        description: error.response.data.message,
        status: 'error',
        duration: 4000,
        colorScheme: 'red',
        isClosable: true
      });
      return;
    }

    router.push('/');
    return response;
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={isNameEmpty}>
              <FormLabel>Full name</FormLabel>
              <Input type="text" value={name} onChange={handleNameChange} />
              <FormErrorMessage>Full name is required.</FormErrorMessage>
            </FormControl>
            <FormControl id="username" isRequired isInvalid={isUsernameEmpty}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={isPasswordEmpty}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}
                disabled={
                  isNameEmpty ||
                  isUsernameEmpty ||
                  isPasswordEmpty ||
                  name === undefined ||
                  username === undefined ||
                  password === undefined
                }
                onClick={handleCreateUser}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
