import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import AppButton from "./AppButton";
import AppText from "./AppText";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: any;
};

const AppModalAdd: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => props.onAdd(data);

  const { isOpen, onClose } = props;

  useEffect(() => {
    setValue("title", null);
    setValue("body", null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <>
            <ModalHeader>Tambah Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody width="100">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="title">Judul Post</FormLabel>
                <Input
                  id="title"
                  type="text"
                  placeholder="Judul Post"
                  {...register("title", {
                    required: "Mohon diisi",
                  })}
                />
                <AppText title={errors?.title?.message} color="red" mb="5" />
                <FormLabel htmlFor="description">Deskripsi Post</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Deskripsi Post"
                  size="lg"
                  {...register("body", { required: "Mohon diisi" })}
                />
                <AppText title={errors?.body?.message} color="red" mb="5" />
                <AppButton
                  type="submit"
                  title="Submit"
                  mt={4}
                  colorScheme="teal"
                />
              </form>
            </ModalBody>
          </>

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

export default AppModalAdd;
