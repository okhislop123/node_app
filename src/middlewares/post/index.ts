import { Post, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../../types";
const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      post: Post;
    }
  }
}
export const checkPostExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) {
      res.status(404).send({
        message: "Post not found",
        code: 404,
        data: null,
      } as BaseResponse<null>);
    } else {
      req.post = post;
      next();
    }
    console.log("post", post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      code: 500,
      data: null,
    } as BaseResponse<null>);
  }
};
