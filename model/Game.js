import mongoose from "mongoose";
const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
  },
  systemreq: {
    type: Array,
  },
  critic_review: {
    type: String,
  },
  developer: {
    type: String,
  },
  publisher: {
    type: String,
  },
  release_date: {
    type: String,
  },
  genre: {
    type: String,
  },
  review: {
    type: String,
  },
  price: {
    type: Number,
  },
});
const model = mongoose.model("Game", gameSchema);
export default model;
