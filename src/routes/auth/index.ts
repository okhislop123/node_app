import { Router } from "express";
import { login, register } from "../../controllers/auth";
import { checkCorrectPassword, checkUserExist } from "../../middlewares/auth";

const userRouter = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUserResponse'
 */
userRouter.post("/register", register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 */
userRouter.post("/login", checkUserExist, checkCorrectPassword, login);

export default userRouter;
