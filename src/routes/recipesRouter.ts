import { Router } from "express";
const recipesRouter = Router();
import userController from "../controllers/authController.js";

recipesRouter.post("/register", userController.postRegister);

export default recipesRouter;
