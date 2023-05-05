import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: number;
    title: string;
    body: string;
  };
  isLoading: boolean;
  isError: boolean;
};

const AppModalDetail: React.FC<Props> = (props) => {
  const { isOpen, onClose, data, isLoading, isError } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {isLoading ? (
            <Stack p="10">
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : isError ? (
            "Error Get Post by ID"
          ) : (
            <>
              <ModalHeader>{data.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>{data.body}</div>
              </ModalBody>
            </>
          )}

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppModalDetail;
