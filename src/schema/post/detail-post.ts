import { object, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     PostDetailResponse:
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
 *             id:
 *               type: number
 *             name:
 *               type: string
 *             createAt:
 *               type: string
 *             updateAt:
 *               type: number
 *             title:
 *               type: string
 *             content:
 *               type: string
 *             published:
 *               type: boolean
 *             userId: 
 *               type: number
 *     PostDetailErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: number
 *           default: 404
 *         data:
 *           type: null
 *           default: null
 */
