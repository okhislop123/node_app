import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { hash } from "../../utils/helper";
import { BaseResponse } from "../../types";
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;

    const user: User | null = await prisma.user.create({
      data: {
        email,
        password: hash(password),
      },
    });

    if (user) {
      res.status(200).send({
        message: "Đăng ký thành công",
        code: 200,
        data: user,
      } as BaseResponse<User>);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Đăng ký thất bại",
      code: 200,
      data: null,
    } as BaseResponse<null>);
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Đăng nhập thất bại",
      code: 200,
      data: null,
    } as BaseResponse<null>);
  }
};
