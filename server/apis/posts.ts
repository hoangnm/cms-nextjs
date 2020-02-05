import { json, send } from "micro";
import { getPosts, createPost, getPost } from "../services/posts";

const getAll = async (_, res) => {
  return send(res, 200, await getPosts());
};

const getById = async (req, res) => {
  return send(res, 200, await getPost(req.params.id));
};

const create = async (req, res) => {
  const body = await json(req);
  return send(res, 201, await createPost(body));
};

export default {
  getAll,
  getById,
  create
};
