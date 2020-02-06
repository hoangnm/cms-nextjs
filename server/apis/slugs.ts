import { json, send } from "micro";
import { getSlugs, createSlug } from "../services/slugs";
import { SlugModel } from "../types";

const getAll = async (_, res) => {
  return send(res, 200, await getSlugs());
};

const create = async (req, res) => {
  const body = (await json(req)) as SlugModel;
  return send(res, 201, await createSlug(body));
};

export default {
  getAll,
  create
};
