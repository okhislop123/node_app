import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: huyh4496@gmail.com
 *         password:
 *           type: string
 *           default: 12345
 *     LoginUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: number
 *           default: 200
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 createAt:
 *                   type: string
 *                 updateAt:
 *                   type: number
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   default: USER
 *                 avatar:
 *                   type: string
 *             token:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 token:
 *                   type: string
 *
 */

export const loginUserSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
