import fetch from "isomorphic-unfetch";

export const createPost = async data => {
  const body = {
    ...data,
    slugs: data.slugs.map(slug => slug.id)
  };
  await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return r.json();
};

export const createSlug = async title => {
  const result = await fetch("http://localhost:3000/api/slugs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });
  return result.json();
};
