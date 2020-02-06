import Slug from "../models/Slug";

export const createSlug = async body => {
  const slug = new Slug(body);
  await slug.save();
  return slug;
};

export const getSlugs = async () => {
  const slugs = await Slug.find({}).lean();
  return slugs;
};
