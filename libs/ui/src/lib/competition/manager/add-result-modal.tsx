import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import { DriverDTO, InscriptionDTO } from '@gpseries/contracts';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  isOpen: boolean;
  inscriptions: InscriptionDTO[];
  drivers: DriverDTO[];
  onClose: () => void;
};

export const AddResultModal: React.FunctionComponent<Props> = ({
  isOpen,
  inscriptions,
  drivers,
  onClose
}) => {
  const router = useRouter();
  const toast = useToast();
  const id = 'driver-not-found-driver';

  if (!inscriptions || inscriptions.length === 0) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>Add Result</Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Driver</Th>
                    <Th>Position</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {inscriptions.map(inscription => {
                    const driver = drivers.find(
                      driver => driver?.id === inscription.driverId
                    );

                    if (!driver) {
                      if (!toast.isActive(id)) {
                        toast({
                          id,
                          title: `Cannot get this driver: ${inscription.driverId}`,
                          description: `Please contact support`,
                          status: 'error',
                          duration: 4000,
                          colorScheme: 'red',
                          isClosable: true
                        });
                      }
                      onClose();
                    }

                    return (
                      <Tr key={inscription.id}>
                        <Td>{driver?.name}</Td>
                        <Td>
                          <NumberInput min={1}>
                            <NumberInputField />
                          </NumberInput>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
