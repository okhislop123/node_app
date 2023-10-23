import { Post, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BaseResponse } from "../../types";
const prisma = new PrismaClient();

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const { title, content, published } = req.query;
    console.log("title", title);

    const data: Post[] = await prisma.post.findMany({
      skip: 0,
      take: 5,
      orderBy: {
        id: "desc",
      },
      where: {
        ...(published !== undefined
          ? {
              published: {
                equals: published === "true",
              },
            }
          : {}),
      },
    });
    const newData = await prisma.$queryRaw`
      SELECT * FROM Post
      WHERE content LIKE ${`%${title}%`}
    `;
    console.log("newData", newData);
    res.status(200).send({
      code: 200,
      message: "Get all post succeeded",
      data,
    } as BaseResponse<Post[]>);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: null,
      message: "Get all post failed",
      code: 500,
    } as BaseResponse<null>);
  }
};

export const getPostByID = async (req: Request, res: Response) => {
  try {
    const post = req.post;
    res.status(200).send({
      message: "Get post succeeded",
      code: 200,
      data: post,
    } as BaseResponse<Post>);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: null,
      message: "Get post failed",
      code: 500,
    } as BaseResponse<null>);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { content, title, published } = req.body as Post;
    const post = await prisma.post.create({
      data: {
        content,
        title,
        published,
        userId: user?.id ?? 0,
      },
    });
    if (post) {
      res.status(201).send({
        message: "Create post succeeded",
        code: 201,
        data: post,
      } as BaseResponse<Post>);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Create post failed",
      code: 500,
      data: null,
    } as BaseResponse<null>);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = req.post;
    const { content, title, published } = req.body as Post;
    const newPost = await prisma.post.update({
      data: {
        content,
        title,
        published,
        userId: post.userId,
      },
      where: {
        id: post.id,
      },
    });
    if (post) {
      res.status(201).send({
        message: "Update post succeeded",
        code: 201,
        data: newPost,
      } as BaseResponse<Post>);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Update post failed",
      code: 500,
      data: null,
    } as BaseResponse<null>);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = req.post;
    await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    res.status(200).send({
      message: "Delete succeeded",
      code: 200,
      data: null,
    } as BaseResponse<null>);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: null,
      message: "Delete post failed",
      code: 500,
    } as BaseResponse<null>);
  }
};
