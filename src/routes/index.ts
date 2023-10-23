import { Router } from "express";
import userRouter from "./auth";
import postRouter from "./post";

const rootRouter = Router();
rootRouter.use("/auth", userRouter);
rootRouter.use("/post", postRouter)

export default rootRouter;
