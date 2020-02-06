import mongoose from "mongoose";

const { Schema } = mongoose;

const slugSchema = new Schema({
  title: {
    type: String,
    unique: true
  }
});

const Slug = mongoose.model("Slug", slugSchema);

export default Slug;
