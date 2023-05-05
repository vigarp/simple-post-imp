import axios from "axios";

export async function getPost() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
}

export async function getPostById(id: number | null) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.data;
}

export async function deletePostById(id: number | null) {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.data;
}
