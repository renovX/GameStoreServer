import express from "express";
import authController from "../controller/auth.js";
const authRouter = express.Router();
authRouter.post("/login", authController.logIn);
authRouter.post("/google-login", authController.googleLogin);
authRouter.post("/logout", authController.logOut);
authRouter.post("/register", authController.register);
//authRouter.get("/logout", authController.logOut);

export default authRouter;
