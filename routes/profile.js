import express from "express";
import profileController from "../controller/profile.js";
const profileRouter = express.Router();
profileRouter.post("/update", profileController.update);
profileRouter.get("/add-to-library", profileController.addToLibrary);
profileRouter.get("/get-data", profileController.getData);
//authRouter.get("/logout", authController.logOut);

export default profileRouter;
