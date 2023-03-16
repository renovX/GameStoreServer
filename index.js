import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import gameRouter from "./routes/game.js";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send("Error parsing data");
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use("/game", gameRouter);

const PORT = process.env.PORT || 8000;
try {
  await mongoose.connect(
    "mongodb+srv://lasty401:foolishdon@cluster0.vzeau1t.mongodb.net/sample"
  );
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
