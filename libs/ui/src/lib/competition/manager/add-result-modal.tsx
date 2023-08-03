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
import { AddResultDTO, DriverDTO, InscriptionDTO } from '@gpseries/contracts';
import { addResults } from '@gpseries/hooks';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

type Props = {
  isOpen: boolean;
  inscriptions: InscriptionDTO[];
  setInscriptions: React.Dispatch<
    React.SetStateAction<InscriptionDTO[] | undefined>
  >;
  drivers: DriverDTO[];
  onClose: () => void;
};

export const AddResultModal: React.FunctionComponent<Props> = ({
  isOpen,
  inscriptions,
  setInscriptions,
  drivers,
  onClose
}) => {
  const router = useRouter();
  const toast = useToast();
  const id = 'driver-not-found-driver';

  const [isFetching, setFetching] = useState<boolean>(false);

  const handleAddResult = async (dtos: AddResultDTO[]) => {
    await addResults(dtos);
  };

  const sortByPosition = useCallback((a, b) => {
    if (!a.position && !b.position) {
      return 0;
    } else if (!a.position) {
      return 1;
    } else if (!b.position) {
      return -1;
    } else {
      return a.position - b.position;
    }
  }, []);

  if (inscriptions.length === 0 || !inscriptions || !drivers) {
    return null;
  }

  setInscriptions(inscriptions.sort(sortByPosition));

  const handleChangePosition = (position, inscriptionId) => {
    const index = inscriptions.findIndex(
      inscription => inscription.id === inscriptionId
    );

    if (index === -1) {
      return;
    }

    const updatedInscriptions = [...inscriptions];
    const selectedInscription = updatedInscriptions[index];

    updatedInscriptions[index] = {
      id: selectedInscription.id,
      raceId: selectedInscription.raceId,
      driverId: selectedInscription.driverId,
      position
    };

    setInscriptions(updatedInscriptions.sort(sortByPosition));
  };

  const options = [
    { label: '🏆 Winner', id: 1 },
    { label: 'DNS/DNF', id: null }
  ];

  for (let index = 0; index < inscriptions.length - 1; index++) {
    const position = index + 2;
    options.push({ label: position.toString(), id: position });
  }

  const hasDuplicatesWithSamePosition = () => {
    const positionCount: Record<number, number> = {};

    for (const obj of inscriptions) {
      const { position } = obj;
      if (position) {
        positionCount[position] = (positionCount[position] || 0) + 1;
      }
    }

    return Object.values(positionCount).some(count => count > 1);
  };

  const hasAnyUndefinedPosition = () => {
    return inscriptions.some(inscription => inscription.position === undefined);
  };

  console.log(hasDuplicatesWithSamePosition);

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
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            sx={{ width: 180 }}
                            renderInput={params => <TextField {...params} />}
                            onChange={(event, value) =>
                              handleChangePosition(value?.id, inscription.id)
                            }
                            value={
                              inscription.position
                                ? options.find(
                                    item => item.id === inscription.position
                                  )
                                : null
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
            onClick={async () => {
              setFetching(true);
              const validInscriptions = inscriptions.filter(
                inscription => inscription.position
              );

              await handleAddResult(
                validInscriptions.map(inscription => {
                  return {
                    inscriptionId: inscription.id,
                    position: inscription.position
                  } as AddResultDTO;
                })
              );

              onClose();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
