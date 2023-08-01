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
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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

  const sortByPosition = (a, b) => {
    if (a.position === undefined && b.position === undefined) {
      return 0;
    } else if (a.position === undefined) {
      return 1;
    } else if (b.position === undefined) {
      return -1;
    } else {
      return a.position - b.position;
    }
  };

  const [resultInscriptions, setResult] = useState<InscriptionDTO[]>();

  useEffect(() => {
    setResult(inscriptions.sort(sortByPosition));
  }, [inscriptions]);

  if (inscriptions.length === 0 || !resultInscriptions) {
    return null;
  }

  console.log(resultInscriptions);

  const handleChangePosition = (position, inscriptionId) => {
    const index = resultInscriptions.findIndex(
      inscription => inscription.id === inscriptionId
    );

    if (index === -1) {
      return;
    }

    const updatedInscriptions = [...resultInscriptions];
    const selectedInscription = updatedInscriptions[index];

    updatedInscriptions[index] = {
      id: selectedInscription.id,
      raceId: selectedInscription.raceId,
      driverId: selectedInscription.driverId,
      position
    };

    setResult(updatedInscriptions.sort(sortByPosition));
  };

  const options = [{ label: '🏆 Winner', id: 1 }];

  for (let index = 0; index < inscriptions.length - 1; index++) {
    const position = index + 2;
    options.push({ label: position.toString(), id: position });
  }

  const hasDuplicatesWithSamePosition = () => {
    const positionCount: Record<number, number> = {};

    for (const obj of resultInscriptions) {
      const { position } = obj;
      if (position !== undefined) {
        positionCount[position] = (positionCount[position] || 0) + 1;
      }
    }

    return Object.values(positionCount).some(count => count > 1);
  };

  console.log(resultInscriptions);

  const hasAnyUndefinedPosition = () => {
    return resultInscriptions.some(inscription => !inscription.position);
  };

  console.log(resultInscriptions);

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
                  {resultInscriptions.map(inscription => {
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
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            sx={{ width: 180 }}
                            renderInput={params => <TextField {...params} />}
                            onChange={(event, value) =>
                              handleChangePosition(value?.id, inscription.id)
                            }
                          />
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
          <Button
            colorScheme="green"
            disabled={
              hasDuplicatesWithSamePosition() || hasAnyUndefinedPosition()
            }
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
