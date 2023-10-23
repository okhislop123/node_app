import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostByID,
  updatePost,
} from "../../controllers/post";
import { checkTokenUser } from "../../middlewares/auth";
import { checkPostExist } from "../../middlewares/post";

const postRouter = Router();

postRouter.get("", getAllPost);
postRouter.get("/:id", [checkPostExist], getPostByID);
postRouter.post("", [checkTokenUser], createPost);
postRouter.put("/:id", [checkTokenUser, checkPostExist], updatePost);
postRouter.delete("/:id", [checkTokenUser, checkPostExist], deletePost);

export default postRouter;
