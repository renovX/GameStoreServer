import mongoose from "mongoose";
const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  address: {
    type: Array,
  },
  libraryGames: {
    type: Array,
  },
  cart: {
    type: Array,
  },
});
const model = mongoose.model("Profile", profileSchema);
export default model;
