import { useEffect, useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Link,
  Stack,
  Skeleton,
  Center,
} from "@chakra-ui/react";
import { getPost, getPostById } from "@/store/slice";
import { ImBin, ImPencil } from "react-icons/im";
import AppModalEdit from "@/components/AppModalEdit";
import AppModalDetail from "@/components/AppModalDetail";
import AppModalDelete from "@/components/AppModalDelete";
import AppText from "@/components/AppText";
import AppButton from "@/components/AppButton";
import AppModalAdd from "@/components/AppModalAdd";
import Head from "next/head";

interface Post {
  id: number;
  title: string;
  body: string;
}
const queryClient = new QueryClient();

function Home() {
  const [allDataPost, setAllDataPost] = useState<Post[]>([]);
  const [idDetailPost, setIdDetailPost] = useState<number | null>(null);
  const [detailPost, setDetailPost] = useState<Post>({
    id: 0,
    title: "",
    body: "",
  });

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const {
    data: allPost,
    isLoading: isLoadingAllPost,
    isError: isErrorAllPost,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  const { isLoading: isLoadingDetailPost, isError: isErrorDetailPost } =
    useQuery({
      queryKey: ["posts", idDetailPost],
      enabled: idDetailPost !== null,
      queryFn: () => getPostById(idDetailPost),
    });

  useEffect(() => {
    if (allPost) {
      setAllDataPost(allPost.slice(0, 5));
    }
  }, [allPost]);

  const handleModalAdd = (status: boolean) => {
    setIsModalAddOpen(status);
  };

  const handleModalDetail = (status: boolean, id: number) => {
    if (id !== null) {
      setIdDetailPost(id);
      setIsModalDetailOpen(status);
      let detailPostData = allDataPost.find((p) => p.id === id);
      if (detailPostData) return setDetailPost(detailPostData);
    }
  };

  const handleModalEdit = (status: boolean, id: number) => {
    if (id !== null) {
      setIdDetailPost(id);
      setIsModalEditOpen(status);
      let detailPostData = allDataPost.find((p) => p.id === id);
      if (detailPostData) return setDetailPost(detailPostData);
    }
  };

  const handleModalDelete = (status: boolean, id: number) => {
    if (id !== null) {
      setIsModalDeleteOpen(status);
      setIdDetailPost(id);
    }
  };

  const handleSubmitData = (data: any) => {
    const newPost = {
      id: allDataPost.length + 1,
      title: data.title,
      body: data.body,
    };
    setAllDataPost([...allDataPost, newPost]);
    setIsModalAddOpen(false);
  };

  const handleConfirmation = (isConfirmed: boolean) => {
    if (isConfirmed) {
      setAllDataPost(
        allDataPost.filter((post: any) => post.id !== idDetailPost)
      );
      setIsModalDeleteOpen(false);
    }
  };

  const handleEditData = (data: any) => {
    setAllDataPost(
      allDataPost.map((p: any) => {
        if (p.id === data.id) {
          return {
            ...p,
            id: data.id,
            title: data.title,
            body: data.body,
          };
        }
        return p;
      })
    );
    setIsModalEditOpen(false);
  };

  return (
    <>
      {isLoadingAllPost ? (
        <Stack p="10">
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : isErrorAllPost ? (
        <AppText title="Error from server" />
      ) : (
        <Stack px="5">
          <Center my="5">
            <AppText title="Daftar Post" fontSize="xl" fontWeight="medium" />
          </Center>
          <AppButton
            title="Tambah Post"
            width="10%"
            colorScheme="telegram"
            onClick={() => handleModalAdd(true)}
          />
          <TableContainer>
            <Table variant="striped">
              <TableCaption>Daftar Post</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Judul</Th>
                  <Th>Deskripsi</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allDataPost?.map((res: any, idx: any) => (
                  <Tr key={idx}>
                    <Td>{res.id}</Td>
                    <Td>{res.title}</Td>
                    <Td>
                      <pre>{res.body.slice(0, 25) + "..."}</pre>
                      <Link
                        onClick={() => handleModalDetail(true, res.id)}
                        color="teal.500"
                      >
                        Baca selengkapnya
                      </Link>
                    </Td>
                    <Td>
                      <Stack direction="row" spacing={4}>
                        <Button
                          leftIcon={<ImPencil />}
                          colorScheme="blue"
                          variant="solid"
                          onClick={() => handleModalEdit(true, res.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          rightIcon={<ImBin />}
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleModalDelete(true, res.id)}
                        >
                          Hapus
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      )}

      <AppModalDetail
        isOpen={isModalDetailOpen}
        onClose={() => setIsModalDetailOpen(false)}
        data={detailPost}
        isLoading={isLoadingDetailPost}
        isError={isErrorDetailPost}
      />

      <AppModalAdd
        isOpen={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        onAdd={handleSubmitData}
      />

      <AppModalEdit
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        data={detailPost}
        onEdited={handleEditData}
        // isLoading={isLoadingEditPost}
        // isError={isErrorEditPost}
      />

      <AppModalDelete
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirmation={handleConfirmation}
      />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Simple Post IMP | Vigar R. Putra</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Home />
    </QueryClientProvider>
  );
}
