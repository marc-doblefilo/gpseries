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
  useToast,
  VStack
} from '@chakra-ui/react';
import { RaceDTO } from '@gpseries/contracts';
import { deleteRace } from '@gpseries/hooks';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  race: RaceDTO | undefined;
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteRaceAlertDialog: React.FunctionComponent<Props> = ({
  race,
  isOpen,
  onClose
}) => {
  const router = useRouter();
  const toast = useToast();

  const cancelRef = React.useRef(null);

  if (!race) {
    return null;
  }

  const handleDeleteRace = async () => {
    const [response, error] = await deleteRace(race.id);

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

    toast({
      title: `Race was deleted`,
      status: 'success',
      duration: 4000,
      colorScheme: 'teal',
      isClosable: true
    });
    return;
  };

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
          <Button
            colorScheme="red"
            ml={3}
            onClick={async () => {
              await handleDeleteRace();

              onClose();

              router.reload();
            }}
          >
            I'm sure
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
