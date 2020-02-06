import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  author: String,
  body: String,
  slugs: [{ type: Schema.Types.ObjectId, ref: "Slug" }],
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
