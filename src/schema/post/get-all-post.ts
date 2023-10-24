/**
 * @openapi
 * components:
 *   schemas:
 *     GetAllPostResponse:
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
 *             currentPage:
 *               type: number
 *               default: 1
 *             totalItem:
 *               type: number
 *               default: 0
 *             totalPage:
 *               type: number
 *               default: 0
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   createAt:
 *                     type: string
 *                   updateAt:
 *                     type: number
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   published:
 *                     type: boolean
 *                   userId: 
 *                     type: number 
 *                      
 */
