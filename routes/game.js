import express from "express";
import { Router } from "express";
import gameController from "../controller/game.js";
const gameRouter = express.Router();
gameRouter.post("/addgame", gameController.addGame);
gameRouter.get("/getgame/:name", gameController.getGame);
export default gameRouter;
