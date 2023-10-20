import { Router } from "express";
import userRouter from "./auth";

const rootRouter = Router();
rootRouter.use("/auth", userRouter);

export default rootRouter;
