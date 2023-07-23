import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  Text,
  VStack
} from '@chakra-ui/react';
import { RaceDTO } from '@gpseries/contracts';
import { useRouter } from 'next/router';
import { Session } from 'next-auth/client';
import React from 'react';

type Props = {
  race: RaceDTO;
  isOpen: boolean;
  onClose: () => void;
};

export const RaceRemoverAlertDialog: React.FunctionComponent<Props> = ({
  race,
  isOpen,
  onClose
}) => {
  const router = useRouter();

  const cancelRef = React.useRef(null);

  if (!race) {
    router.back();
    return <Text>Race not found</Text>;
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Center>Remove {race.name}</Center>
        </AlertDialogHeader>
        <AlertDialogBody>
          <VStack gap={2}>
            <Text>Are you sure you want to remove {race.name}?</Text>
            <Text color="red.500" as="b">
              This race will be permanently removed
            </Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogCloseButton />
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" ml={3}>
            I'm sure
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
