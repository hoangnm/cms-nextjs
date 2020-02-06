import Slug from "../models/slug";
import { SlugModel } from "../types";

export const createSlug = async (body: SlugModel): Promise<SlugModel> => {
  const slug = new Slug(body);
  await slug.save();
  return slug.toObject({ getters: true });
};

export const getSlugs = async (): Promise<SlugModel[]> => {
  const slugs = await Slug.find({}).lean();
  return slugs;
};
