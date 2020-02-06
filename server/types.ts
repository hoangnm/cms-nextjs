export interface PostModel {
  _id?: string;
  title: string;
  author: string;
  body: string;
  slugs: string[];
}

export interface SlugModel {
  _id?: string;
  title: string;
}
