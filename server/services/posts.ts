import Post from "../models/post";

export const getPosts = async () => {
  const posts = await Post.find({}).lean();
  return posts;
};

export const getPost = async (id: string) => {
  const post = await Post.findById(id).lean();
  return post;
};

export const createPost = async body => {
  const post = new Post(body);
  await post.save();
  return post;
};

