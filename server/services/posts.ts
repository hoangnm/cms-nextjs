import Post from "../models/post";
import { PostModel } from "../types";

export const getPosts = async (): Promise<PostModel[]> => {
  const posts = await Post.find({}).lean();
  return posts;
};

export const getPost = async (id: string): Promise<PostModel> => {
  const post = await Post.findById(id).lean();
  return post;
};

export const createPost = async (body: PostModel): Promise<PostModel> => {
  const post = new Post(body);
  await post.save();
  return post;
};
