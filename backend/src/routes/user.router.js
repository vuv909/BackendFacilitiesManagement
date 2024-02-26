import express from 'express';
import { userController } from '../controllers/index.js';
import authJWT from '../middlewares/authJWT.js';

const userRouter = express.Router();

userRouter.post("/login", userController.login);
// view list user

userRouter.get("/", userController.FindAll);
// view user profile
// created by: quốc khánh 
userRouter.get("/:id", authJWT.verifyToken, userController.FindOne);

// Update User profile 
userRouter.put("/:id", userController.UpdateOne);
export default userRouter;