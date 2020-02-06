import mongoose from "mongoose";

const Schema = mongoose.Schema;

const slugSchema = new Schema({
  title: String
});

const Slug = mongoose.model("Slug", slugSchema);

export default Slug;
