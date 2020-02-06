import Post from "../models/post";
import { PostModel } from "../types";

export const getPosts = async (): Promise<PostModel[]> => {
  const posts = await Post.find({}).exec();
  return posts.map(post => post.toObject({ getters: true }));
};

export const getPost = async (id: string): Promise<PostModel> => {
  const post = await Post.findById(id)
    .populate("slugs")
    .exec();
  return post.toObject({ getters: true });
};

export const createPost = async (body: PostModel): Promise<PostModel> => {
  const post = new Post(body);
  await post.save();
  return post.toObject({ getters: true });
};
