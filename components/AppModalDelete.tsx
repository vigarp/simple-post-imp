import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmation: any;
};

const AppModalDelete: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const handleConfirmation = (isConfirmed: boolean) => {
    props.onConfirmation(isConfirmed);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>Apakah Anda yakin ingin menghapus post?</div>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleConfirmation(true)}
            >
              Hapus
            </Button>
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppModalDelete;
