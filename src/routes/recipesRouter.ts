import { Router } from "express";
const recipesRouter = Router();
import userController from "../controllers/authController.js";

recipesRouter.post("/register", userController.postRegister);
recipesRouter.post("/login", userController.postLogin);
recipesRouter.post("/logout", userController.postLogout);

export default recipesRouter;
