import jwt from "jsonwebtoken";
import { error } from "console";
import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../../types";
import { compareHash } from "../../utils/helper";
import { verifyToken } from "../../utils/jwt";

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

export const checkTokenUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).send({
      code: 401,
      message: "Failed authentication",
      data: null,
    } as BaseResponse<null>);
  } else {
    const tokenVerify = verifyToken(token) as jwt.JwtPayload;
    if (tokenVerify?.data) {
      req.user = tokenVerify?.data as UserNoPassword;
      next();
    } else {
      res.status(403).send({
        code: 403,
        message: "Forbidden",
        data: null,
      } as BaseResponse<null>);
    }
  }
};
