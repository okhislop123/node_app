import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostByID,
  updatePost,
} from "../../controllers/post";
import { checkTokenUser } from "../../middlewares/auth";
import { checkPostExist } from "../../middlewares/post";

const postRouter = Router();

/**
 * @openapi
 * /api/v1/post:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get all post
 *     security: []
 *     parameters:
 *     - name: title
 *       in: query
 *       description: The title of the post
 *       schema:
 *         type: string
 *     - name: content
 *       in: query
 *       description: The content of the post
 *       schema:
 *         type: string
 *     - name: published
 *       in: query
 *       description: The published of the post
 *       schema:
 *         type: boolean
 *     - name: page
 *       in: query
 *       description: The current page of the post
 *       schema:
 *         type: number
 *     - name: totalItemsPerPage
 *       in: query
 *       description: The total item in a page of the post
 *       schema:
 *         type: number
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllPostResponse'
 */  

postRouter.get("", getAllPost);

/**
 * @openapi
 * /api/v1/post/{id}:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get detail post
 *     security: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The id of the post
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDetailResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDetailErrorResponse'
 */       

postRouter.get("/:id", [checkPostExist], getPostByID);

/**
 * @openapi
 * /api/v1/post:
 *   post:
 *     tags:
 *       - Post
 *     summary: Create post
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreateRequest'
 *     responses:
 *       201:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDetailResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDetailErrorResponse'
 */ 
postRouter.post("", [checkTokenUser], createPost);

/**
 * @openapi
 * /api/v1/post/{id}:
 *   put:
 *     tags:
 *       - Post
 *     summary: Update post
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The id of the post
 *       required: true
 *       schema:
 *        type: number
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdateRequest' 
 *     responses:
 *       201:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostUpdateResponse'
 */ 
postRouter.put("/:id", [checkTokenUser, checkPostExist], updatePost);

/**
 * @openapi
 * /api/v1/post/{id}:
 *   delete:
 *     tags:
 *       - Post
 *     summary: Delete post
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The id of the post
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDeleteResponse'
 */ 
postRouter.delete("/:id", [checkTokenUser, checkPostExist], deletePost);

export default postRouter;
