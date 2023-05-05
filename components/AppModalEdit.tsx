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
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import AppButton from "./AppButton";
import { useEffect, useState } from "react";
import AppText from "./AppText";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: number;
    title: string;
    body: string;
  };
  onEdited: any;
  // isLoading: boolean;
  // isError: boolean;
};

const AppModalEdit: React.FC<Props> = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [idPost, setIdPost] = useState<number | null>(null);

  const onSubmit = (data: any) => props.onEdited({ ...data, id: idPost });

  const { isOpen, onClose, data } = props;

  useEffect(() => {
    setIdPost(data?.id);
    setValue("title", data?.title);
    setValue("body", data?.body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <>
            <ModalHeader>Edit Post</ModalHeader>
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

export default AppModalEdit;
