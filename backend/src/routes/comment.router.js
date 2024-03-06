import express from 'express';
import { commentController } from '../controllers/index.js';
import authJWT from '../middlewares/authJWT.js';

const commentRouter = express.Router();

commentRouter.post("/create", [authJWT.verifyToken], commentController.create);
commentRouter.get("/check-permission", [authJWT.verifyToken], commentController.checkCommentPermisson);
commentRouter.put("/update", [authJWT.verifyToken], commentController.update);
commentRouter.get("/list", [authJWT.verifyToken], commentController.getListCommentByFacility)

export default commentRouter;