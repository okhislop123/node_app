import { Router } from "express";
import { login, register } from "../../controllers/auth";
import { checkCorrectPassword, checkUserExist } from "../../middlewares/auth";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", checkUserExist, checkCorrectPassword, login);

export default userRouter;
