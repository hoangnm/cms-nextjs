import fetch from "isomorphic-unfetch";

const baseApiUrl = "http://localhost:3000/api";

export const getPost = async (id: string) => {
  const res = await fetch(`${baseApiUrl}/posts/${id}`);
  const post = await res.json();
  return post;
};

export const getPosts = async () => {
  const res = await fetch(`${baseApiUrl}/posts`);
  return res.json();
};

export const createPost = async data => {
  const body = {
    ...data,
    slugs: data.slugs.map(slug => slug.id)
  };
  const result = await fetch(`${baseApiUrl}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return result.json();
};

export const createSlug = async (title: string) => {
  const result = await fetch(`${baseApiUrl}/slugs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });
  const data = await result.json();
  return {
    id: data._id,
    name: data.title
  };
};

export const getSlugs = async () => {
  const res = await fetch(`${baseApiUrl}/slugs`);
  const result = await res.json();
  const slugs = result.map(item => ({ id: item._id, name: item.title }));
  return slugs;
};
