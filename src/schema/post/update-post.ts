/**
 * @openapi
 * components:
 *   schemas:
 *     PostUpdateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         published:
 *           type: boolean
 *     PostUpdateResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: number
 *           default: 201
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
 */
