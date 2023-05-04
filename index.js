import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import gameRouter from "./routes/game.js";
import dotenv from "dotenv";
import profileRouter from "./routes/profile.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import verify from "./middleware/verify.js";
dotenv.config();
//import payRouter from "./routes/payment.js";
import stripeRouter from "./routes/stripe.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: "true",
  })
);

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send("Error parsing data");
  } else {
    next();
  }
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/game", gameRouter);
app.use("/profile", profileRouter);
app.use("/stripe", stripeRouter);
app.use("/auth", authRouter);
const PORT = process.env.PORT || 8000;
try {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
