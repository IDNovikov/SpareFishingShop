import { $authHost, $host } from "./index";

//posts

export const createPost = async (post) => {
  const { data } = await $authHost.post("api/blog", post);
  return data;
};

export const fetchPosts = async (page, limit = 5) => {
  const { data } = await $host.get("api/blog", { params: { page, limit } });
  return data;
};

//oneProduct

export const fetchOnePost = async (id) => {
  const { data } = await $host.get("api/blog/" + id);
  return data;
};

//deletePost

export const deletePost = async (id) => {
  const { data } = await $authHost.delete("api/blog", { data: { postID: id } });
  return data;
};
