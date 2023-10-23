import { UserNoPassword } from "./../../middlewares/auth/index";
import { Request, Response } from "express";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { hash } from "../../utils/helper";
import { BaseResponse } from "../../types";
import { error } from "console";
import { signToken } from "../../utils/jwt";
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;

    const user: User | null = await prisma.user.create({
      data: {
        email,
        password: hash(password ?? ""),
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
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        res.status(400).send({
          message: "Đăng ký thất bại, Email đã tồn tại",
          code: 400,
          data: null,
        } as BaseResponse<null>);
      } else {
        res.status(500).send({
          message: "Đăng ký thất bại, vui lòng thử lại sau",
          code: 500,
          data: null,
        } as BaseResponse<null>);
      }
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw error;
    }

    const accessToken = signToken({
      data: user,
      type: "token",
    });
    const refreshToken = signToken({
      data: user,
      type: "accessToken",
    });

    if (!accessToken || !refreshToken) throw error;

    res.status(200).send({
      message: "Đăng nhập thành công",
      code: 200,
      data: {
        user,
        token: {
          accessToken,
          refreshToken,
        },
      },
    } as BaseResponse<{
      token: {
        accessToken: string;
        refreshToken: string;
      };
      user: UserNoPassword;
    }>);
  } catch (error) {
    console.log("err", error);
    res.status(500).send({
      message: "Đăng nhập thất bại",
      code: 200,
      data: null,
    } as BaseResponse<null>);
  }
};
