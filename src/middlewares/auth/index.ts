import { error } from "console";
import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../../types";
import { compareHash } from "../../utils/helper";

export type UserNoPassword = Pick<
  User,
  "id" | "avatar" | "createAt" | "email" | "name" | "role" | "updateAt"
>;

declare global {
  namespace Express {
    interface Request {
      user?: UserNoPassword;
    }
  }
}
const prisma = new PrismaClient();

export const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as User;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const { password, ...data } = user;
      req.user = data;
      next();
    } else {
      res.status(404).send({
        message: "Tài khoản không tồn tại",
        code: 404,
        data: null,
      } as BaseResponse<null>);
    }
  } catch (error) {
    res.status(500).send({
      message: "Có lỗi xảy ra vui lòng thử lại sau",
      code: 200,
      data: null,
    } as BaseResponse<null>);
  }
};

export const checkCorrectPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password: pw, email } = req.body as User;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw error;
    if (!compareHash(user.password, pw)) {
      res.status(404).send({
        message: "Mật khẩu đăng nhập không đúng",
        code: 404,
        data: null,
      } as BaseResponse<null>);
    } else {
      const { password, ...data } = user;
      req.user = data;
      next();
    }
  } catch (error) {
    res.status(500).send({
      message: "Có lỗi xảy ra vui lòng thử lại sau",
      code: 200,
      data: null,
    } as BaseResponse<null>);
  }
};
