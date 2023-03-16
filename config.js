import mongoose from "mongoose";
await mongoose.connect(
  "mongodb+srv://renovx:xterminator66@cluster0.eliqarh.mongodb.net/gamewebstore"
);
const db = mongoose.connection;
export default db;
